import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './test.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

test('RLS: user can only access their own documents', async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  expect(error).toBeNull();
  expect(user).toBeDefined();

  const testDoc = {
    id: `test-rls-doc-${Date.now()}`,
    content: 'RLS test content',
    user_id: user.id
  };

  const insert = await supabase.from('documents').insert([testDoc]);
  expect(insert.error).toBeNull();

  const select = await supabase
    .from('documents')
    .select('*')
    .eq('id', testDoc.id);

  expect(select.data.length).toBe(1);
  expect(select.data[0].user_id).toBe(user.id);
});
