import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxhxgcavcrnjuepfwuqi.supabase.co";

const supabaseAnonKey =
  "sb_publishable_HpevGd_anUgOILK7PnZnLA_ByPdIE0z";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
