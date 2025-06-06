import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/integrations', async (req, res) => {
  const { data, error } = await supabase
    .from('integration')
    .select(`integration_id, integration_name, description, last_update, company:company_id(company_name)`)
    .order('last_update', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Adaptar para o formato esperado pelo frontend
  const mapped = (data || []).map((item) => ({
    id: String(item.integration_id),
    name: item.integration_name,
    company: item.company?.company_name || '',
    description: item.description,
    releaseDate: item.last_update,
    code: '', // Pode ser preenchido se houver campo no banco
  }));

  res.json(mapped);
});

export default router;
