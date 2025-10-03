import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wprnduwheoynmsorzzmu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwcm5kdXdoZW95bm1zb3J6em11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDUyNDMsImV4cCI6MjA3NTAyMTI0M30.p8Ykav7PGEdIeahBLkN_bBQkwxG9RfXAmbv0g_px0lo"

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
