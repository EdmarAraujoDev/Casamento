import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function testInsert() {
  const { data, error } = await supabase.from('convidados').insert([
    { nome: 'Teste Sistema', mensagem: 'Mensagem teste' }
  ]).select();
  
  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Inserted:", data);
  }
}

testInsert();
