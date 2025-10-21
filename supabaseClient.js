import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qgacdbbfpkvunlkofckt.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYWNkYmJmcGt2dW5sa29mY2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjI1NDMsImV4cCI6MjA3NDE5ODU0M30.8Sj3XFkd49olF6997K9iciuVboYdKIBjDWzzo7w5xp8'
);

export default supabase;
