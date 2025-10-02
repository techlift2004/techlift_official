import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  project_name: string;
  project_description: string;
  image_url: string;
  demo_link: string;
  github_link: string;
  event_type: 'hackathon' | 'daily' | 'weekly';
  created_at: string;
  updated_at: string;
};
