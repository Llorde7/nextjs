import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export default async function handler(req, res){
  const { userId} = req.query

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }
  const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json(data)
}