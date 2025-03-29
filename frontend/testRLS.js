import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testAccess() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) {
    console.error('❌ No user session found:', authError);
    return;
  }

  console.log(`👤 Logged in as: ${user.email} (${user.id})`);

  const docId = `test-doc-${Date.now()}`;

  // INSERT
  const insertRes = await supabase
    .from('documents')
    .insert([{ id: docId, content: 'RLS Test Content', user_id: user.id }]);

  console.log('📥 INSERT:', insertRes.error || 'Success');

  // SELECT
  const selectRes = await supabase
    .from('documents')
    .select('*')
    .eq('id', docId);

  console.log('📄 SELECT:', selectRes.error || selectRes.data);

  // UPDATE
  const updateRes = await supabase
    .from('documents')
    .update({ content: 'Updated content ✅' })
    .eq('id', docId);

  console.log('✏️ UPDATE:', updateRes.error || 'Success');

  // DELETE
  const deleteRes = await supabase
    .from('documents')
    .delete()
    .eq('id', docId);

  console.log('🗑️ DELETE:', deleteRes.error || 'Success');
}

testAccess();
