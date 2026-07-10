import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vewfghbgpsmkipzaeaun.supabase.co";
const supabaseKey = "sb_publishable_5Shz3ZNWVQYrotYcn3tYNg_F2fpa054";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
