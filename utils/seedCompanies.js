import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const companies = [
  { company_name: 'Salesforce', url: null },
  { company_name: 'Stripe', url: null },
  { company_name: 'HubSpot', url: null },
  { company_name: 'VTEX', url: 'https://developers.vtex.com/' },
];

async function seedCompanies() {
  for (const company of companies) {
    const { data, error } = await supabase.from('company').insert([company]);
    if (error) {
      console.error('Erro ao inserir:', company.company_name, error.message);
    } else {
      console.log('Inserido:', company.company_name);
    }
  }
  process.exit(0);
}

seedCompanies();
