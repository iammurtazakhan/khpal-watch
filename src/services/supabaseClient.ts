import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://sltjgdodhisguqwzqqrd.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsdGpnZG9kaGlzZ3Vxd3pxcXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMDg4MTcsImV4cCI6MjEwODU4NDgxN30.e2hzvsvymt6pMRoNrUj-_VPs4je1GCcDm4qIM2JNhN8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);