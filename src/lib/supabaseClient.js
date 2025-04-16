import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ovunrtwgiqrmfttbdvat.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dW5ydHdnaXFybWZ0dGJkdmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTMxMjAsImV4cCI6MjA1ODU2OTEyMH0.2wl4OmhjO2-rgCIXU7zAlaboQGoL1cLL8_E7nmEf368";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
