import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co') {
    supabaseUrl = 'https://qjuohlwlkflehkbbpprg.supabase.co'
    supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdW9obHdsa2ZsZWhrYmJwcHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzk1MjcsImV4cCI6MjA4NzcxNTUyN30.sjybpCYx_YChdw4UsrqcxwFes1t5uY1-F4dMnV28ir8'
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
