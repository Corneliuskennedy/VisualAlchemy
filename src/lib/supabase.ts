/**
 * Simple alias for Supabase clients
 * Use this for cleaner imports throughout the app
 */

export { gdprSupabase as supabase, blogSupabase, gdprSupabase } from './supabaseClients';

// Default export is the GDPR client (primary for this app)
export { default } from './supabaseClients'; 