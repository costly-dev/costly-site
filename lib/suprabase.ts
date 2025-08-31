import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase URL:', supabaseUrl) // Temporary - remove after testing
console.log('Supabase Key exists:', !!supabaseAnonKey) // Temporary - remove after testing

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
