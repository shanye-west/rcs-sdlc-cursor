import { createClient } from '@supabase/supabase-js';
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/public';

console.log('Supabase URL:', VITE_SUPABASE_URL);
console.log('Supabase Anon Key:', VITE_SUPABASE_ANON_KEY);

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY); 