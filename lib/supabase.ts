import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a custom function to get the Supabase client
export const getSupabaseClient = () => {
  // Check if the environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Only create the client if both URL and key are available
  if (supabaseUrl && supabaseAnonKey) {
    return createClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  // Return null if environment variables are missing
  return null
}

// Create a singleton instance that can be safely used
export const supabase = getSupabaseClient()
