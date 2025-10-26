import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://awuhwgmueyaxerfqtbdh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dWh3Z211ZXlheGVyZnF0YmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTM0ODYsImV4cCI6MjA3NjYyOTQ4Nn0.nNFyl87x8rPSKnXAbObj88LOCYYJWCTdUv8Wpu33VYk";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
