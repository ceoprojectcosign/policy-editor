import { supabase } from './supabaseClient'

export const saveDoc = async (docId, content) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('documents').upsert({
    id: docId,
    user_id: user.id,
    content,
    updated_at: new Date().toISOString(),
  })
}