import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa o Supabase apenas se as credenciais estiverem no .env
export const supabase = supabaseUrl && supabaseUrl !== 'COLE_AQUI_A_URL_DO_SEU_PROJETO' && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
