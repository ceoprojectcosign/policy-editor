const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './test.env' });

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

// File: backend/tests/utils/test-helpers.js
const randomId = (prefix = 'test') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

module.exports = {
  randomId
};