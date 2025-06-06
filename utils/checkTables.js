import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const tables = ['company', 'repo', 'integration'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select();
    if (error) {
      console.error(`Erro ao consultar ${table}:`, error.message);
    } else {
      console.log(`${table}:`, data);
    }
  }
  process.exit(0);
}

checkTables();
