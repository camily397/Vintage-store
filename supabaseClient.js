import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://shliaishdifcxhikupjz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobGlhaXNoZGlmY3hoaWt1cGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0ODIyODYsImV4cCI6MjA3NzA1ODI4Nn0.BPUfWfCjOlkRTTdZhNAcmTjANwO1AuTtMRk9ZYMNJXE";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
