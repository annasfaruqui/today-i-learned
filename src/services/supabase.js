import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://azeotvirgrmgpddjfknp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZW90dmlyZ3JtZ3BkZGpma25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MTc1NjIsImV4cCI6MjAxNDM5MzU2Mn0.G6LoPUXUJ8VB8IJ6x6PgVSmPWSvBpr7VmhHFAUxhxCU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
