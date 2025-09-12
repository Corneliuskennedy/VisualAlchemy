/**
 * Supabase Clients Configuration
 * 
 * This app uses two Supabase projects:
 * 1. Blog Project - for blog posts, authors, and content management
 * 2. GDPR Project - for GDPR checklist app, authentication, and user management
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Blog Supabase Project Configuration
const blogSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mlzugmikxnqgtongzapw.supabase.co";
const blogSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1senVnbWlreG5xZ3Rvbmd6YXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMzE3NTQsImV4cCI6MjA1MzkwNzc1NH0.NmD-lTnmLGkDzhd1SHzGvs1cNZMT0mUf_PhPoBFvuQM";

// GDPR Supabase Project Configuration
// Use local Supabase for development where V2 migrations are applied
const gdprSupabaseUrl = process.env.NEXT_PUBLIC_GDPR_SUPABASE_URL || process.env.GDPR_SUPABASE_URL || "http://localhost:54321";
// Use service role key for local development to bypass auth issues
const gdprSupabaseKey = process.env.NEXT_PUBLIC_GDPR_SUPABASE_ANON_KEY || process.env.GDPR_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

// Enhanced logging for client creation - only in dev mode
const clientLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔧 [Supabase Client] ${message}`);
  }
};

// Suppress the multiple GoTrueClient warning since we intentionally use two clients
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Multiple GoTrueClient instances detected')) {
    // Suppress this specific warning - we intentionally use separate Supabase instances
    return;
  }
  originalWarn.apply(console, args);
};

// Global singleton instances to prevent multiple clients in StrictMode
let blogSupabaseInstance: SupabaseClient | null = null;
let gdprSupabaseInstance: SupabaseClient | null = null;
let clientCreationCount = 0;

/**
 * Blog Supabase Client
 * Use this for:
 * - Blog posts
 * - Authors
 * - Content management
 * - SEO data
 */
const createBlogSupabase = () => {
  if (blogSupabaseInstance) {
    clientLog('Returning existing blog client instance');
    return blogSupabaseInstance;
  }
  
  clientCreationCount++;
  clientLog(`Creating blog client instance (creation #${clientCreationCount})`);
  
  blogSupabaseInstance = createClient(blogSupabaseUrl, blogSupabaseKey, {
    auth: {
      persistSession: false, // Disable auth for blog client
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: 'blog-auth-token', // Unique storage key
    },
    global: {
      headers: { 'X-Client-Info': 'octomatic-blog-client' }
    }
  });
  
  clientLog('Blog client created successfully');
  return blogSupabaseInstance;
};

/**
 * GDPR Supabase Client
 * Use this for:
 * - User authentication (OAuth, magic links)
 * - GDPR checklist data
 * - User profiles
 * - Session management
 */
const createGdprSupabase = () => {
  if (gdprSupabaseInstance) {
    clientLog('Returning existing GDPR client instance');
    return gdprSupabaseInstance;
  }
  
  clientCreationCount++;
  clientLog(`Creating GDPR client instance (creation #${clientCreationCount})`, {
    url: gdprSupabaseUrl,
    keyLength: gdprSupabaseKey.length,
    keyPrefix: gdprSupabaseKey.substring(0, 20) + '...'
  });
  
  // Development mode: Use service role for API calls but maintain auth state
  const isDevelopment = gdprSupabaseUrl.includes('localhost');
  
  gdprSupabaseInstance = createClient(gdprSupabaseUrl, gdprSupabaseKey, {
    auth: {
      persistSession: !isDevelopment, // Disable session persistence only in development
      autoRefreshToken: !isDevelopment,
      detectSessionInUrl: !isDevelopment, // Disable OAuth callback handling in development
      storageKey: isDevelopment ? 'octomatic-gdpr-auth-dev' : 'octomatic-gdpr-auth',
    },
    global: {
      headers: { 
        'X-Client-Info': 'octomatic-gdpr-client',
        ...(isDevelopment && { 'Authorization': `Bearer ${gdprSupabaseKey}` }) // Force service role key only in development
      }
    }
  });
  
  clientLog('GDPR client created successfully');
  return gdprSupabaseInstance;
};

// Create instances immediately and freeze them
const blogSupabase = createBlogSupabase();
const gdprSupabase = createGdprSupabase();

// Export the frozen instances
export { blogSupabase, gdprSupabase };

// Export the GDPR client as default since this is primarily a GDPR app
export default gdprSupabase;

// Usage examples:
// import { blogSupabase, gdprSupabase } from '@/lib/supabaseClients';
// import supabase from '@/lib/supabaseClients'; // defaults to gdprSupabase

// Validation and logging
if (!blogSupabaseUrl || !blogSupabaseKey) {
  console.warn('❌ Blog Supabase configuration missing');
}

if (!gdprSupabaseUrl || !gdprSupabaseKey) {
  console.error('❌ GDPR Supabase configuration missing - app will not work');
} else {
  // Test GDPR key validity
  try {
    const keyParts = gdprSupabaseKey.split('.');
    if (keyParts.length !== 3) {
      console.error('❌ GDPR Supabase key appears malformed - should have 3 parts separated by dots');
    } else {
      clientLog('✅ GDPR Supabase key format appears valid');
    }
  } catch (error) {
    console.error('❌ Error validating GDPR Supabase key:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('✅ Supabase clients configured:');
  console.log(`📝 Blog: ${blogSupabaseUrl}`);
  console.log(`🔒 GDPR: ${gdprSupabaseUrl} (primary)`);
} 