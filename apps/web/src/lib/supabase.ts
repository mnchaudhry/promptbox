import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

// Only initialize if we have the keys, otherwise the whole app crashes on load
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export const createClerkSupabaseClient = (clerkToken?: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: clerkToken ? { Authorization: `Bearer ${clerkToken}` } : {},
    },
  });
};

