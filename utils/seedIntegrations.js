import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Substitua pelos UUIDs reais das empresas inseridas
const COMPANIES = {
  Salesforce: 4,
  Stripe: 5,
  HubSpot: 6,
  VTEX: 2,
};

const integrations = [
  {
    integration_name: 'Salesforce ERP Connector',
    status: 'active',
    description: 'Seamlessly integrate Salesforce CRM data with your existing ERP system. This connector handles bi-directional synchronization ...',
    company_id: COMPANIES.Salesforce,
    last_update: '2024-03-14',
    repo_id: null,
    lambda_id: null,
    api_url: null,
    credentials: null,
  },
  {
    integration_name: 'Stripe Payment Gateway',
    status: 'active',
    description: 'Process payments securely with Stripe\'s payment gateway. This integration supports multiple payment methods and provides...',
    company_id: COMPANIES.Stripe,
    last_update: '2024-02-27',
    repo_id: null,
    lambda_id: null,
    api_url: null,
    credentials: null,
  },
  {
    integration_name: 'HubSpot Marketing Suite',
    status: 'active',
    description: 'Connect your application with HubSpot\'s marketing tools. Automate lead generation, email campaigns, and track marketing...',
    company_id: COMPANIES.HubSpot,
    last_update: '2024-02-29',
    repo_id: null,
    lambda_id: null,
    api_url: null,
    credentials: null,
  },
  {
    integration_name: 'Create Available SKU',
    status: 'active',
    description: 'Automatically create and manage SKUs in your VTEX catalog. This integration handles product variants, pricing, and inventor...',
    company_id: COMPANIES.VTEX,
    last_update: '2024-03-19',
    repo_id: null,
    lambda_id: null,
    api_url: null,
    credentials: null,
  },
  {
    integration_name: 'Create Order',
    status: 'active',
    description: 'Create and manage orders in your VTEX e-commerce platform. Handle order processing, status updates, and customer...',
    company_id: COMPANIES.VTEX,
    last_update: '2024-03-19',
    repo_id: null,
    lambda_id: null,
    api_url: null,
    credentials: null,
  },
];

async function seedIntegrations() {
  for (const integration of integrations) {
    if (!integration.company_id) {
      console.error('UUID da empresa não preenchido para:', integration.integration_name);
      continue;
    }
    const { data, error } = await supabase.from('integration').insert([integration]);
    if (error) {
      console.error('Erro ao inserir:', integration.integration_name, error.message);
    } else {
      console.log('Inserido:', integration.integration_name);
    }
  }
  process.exit(0);
}

seedIntegrations();
