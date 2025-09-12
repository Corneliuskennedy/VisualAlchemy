import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithAzure: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Global state to prevent multiple initializations in StrictMode
const globalAuthState: {
  initialized: boolean;
  subscription: any;
  user: User | null;
  session: Session | null;
  loading: boolean;
  initCount: number;
  isInitializing: boolean;
} = {
  initialized: false,
  subscription: null,
  user: null,
  session: null,
  loading: true,
  initCount: 0,
  isInitializing: false
};

// Enhanced logging function - only log important events in dev mode
const authLog = (message: string, data?: any) => {
  // Only log important events in development mode, skip verbose component lifecycle logs
  if (process.env.NODE_ENV === 'development' && !message.includes('Component') && !message.includes('mounted') && !message.includes('triggered') && !message.includes('Cleanup')) {
    console.log(`🔐 AuthProvider: ${message}`);
  }
};

// Global initialization promise to prevent race conditions
let globalInitPromise: Promise<void> | null = null;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(globalAuthState.user);
  const [session, setSession] = useState<Session | null>(globalAuthState.session);
  const [loading, setLoading] = useState(globalAuthState.loading);
  const initRef = useRef(false);
  const componentId = useRef(Math.random().toString(36).substr(2, 9));

  authLog(`Component ${componentId.current} mounted. Global init count: ${globalAuthState.initCount}, initialized: ${globalAuthState.initialized}`);

  useEffect(() => {
    globalAuthState.initCount++;
    authLog(`useEffect triggered for component ${componentId.current}. Global init count: ${globalAuthState.initCount}, isInitializing: ${globalAuthState.isInitializing}`);
    
    // Prevent double initialization in React StrictMode
    if (initRef.current) {
      authLog(`Component ${componentId.current} already initialized locally, skipping...`);
      return;
    }

    if (globalAuthState.initialized && !globalAuthState.isInitializing) {
      authLog(`Global auth already initialized, syncing state for component ${componentId.current}`);
      // Sync with global state
      setUser(globalAuthState.user);
      setSession(globalAuthState.session);
      setLoading(globalAuthState.loading);
      initRef.current = true;
      return;
    }

    if (globalAuthState.isInitializing) {
      authLog(`Global auth is currently initializing, waiting for completion...`);
      // Wait for the global initialization to complete
      if (globalInitPromise) {
        globalInitPromise.then(() => {
          authLog(`Global initialization completed, syncing state for component ${componentId.current}`);
          setUser(globalAuthState.user);
          setSession(globalAuthState.session);
          setLoading(globalAuthState.loading);
          initRef.current = true;
        });
      }
      return;
    }
    
    // Start global initialization
    globalAuthState.isInitializing = true;
    initRef.current = true;
    authLog(`Starting global auth initialization from component ${componentId.current}`);

    // Create the global initialization promise
    globalInitPromise = initializeAuth();

    globalInitPromise.then(() => {
      globalAuthState.initialized = true;
      globalAuthState.isInitializing = false;
      authLog(`Global auth initialization completed from component ${componentId.current}`);
    }).catch((error) => {
      globalAuthState.isInitializing = false;
      authLog(`Global auth initialization failed from component ${componentId.current}:`, error);
    });

    return () => {
      authLog(`Cleanup for component ${componentId.current}`);
    };
  }, []);

  const initializeAuth = async (): Promise<void> => {
    try {
      authLog('Starting auth initialization...');
      
      // Check if we're in development mode (local Supabase)
      const isDevelopment = window.location.hostname === 'localhost';
      
      if (isDevelopment) {
        // Development mode: Check all possible localStorage keys for auth data
        const possibleKeys = [
          'octomatic-gdpr-auth',
          'octomatic-gdpr-auth-dev', 
          'sb-kqyogxmrrpvgjdamnhgs-auth-token',
          'sb-localhost-auth-token',
          'supabase.auth.token'
        ];
        
        authLog('Development mode detected, checking localStorage keys:', possibleKeys);
        
        let foundAuthData = null;
        let foundKey = null;
        
        for (const key of possibleKeys) {
          const data = localStorage.getItem(key);
          if (data) {
            authLog(`Found data in localStorage key "${key}":`, data.substring(0, 100) + '...');
            try {
              const parsed = JSON.parse(data);
              if (parsed.user || parsed.access_token) {
                foundAuthData = parsed;
                foundKey = key;
                break;
              }
            } catch (e) {
              authLog(`Failed to parse data from key "${key}":`, e);
            }
          }
        }
        
        if (foundAuthData) {
          authLog(`Using auth data from key "${foundKey}":`, {
            hasUser: !!foundAuthData.user,
            hasAccessToken: !!foundAuthData.access_token,
            userEmail: foundAuthData.user?.email || 'no email'
          });
          
          // Create a mock session for development using found data
          const mockSession = {
            access_token: 'dev-mock-token',
            refresh_token: 'dev-mock-refresh',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            user: {
              id: foundAuthData.user?.id || '57cbd069-f054-4b86-bbcf-a2571ef77a27',
              email: foundAuthData.user?.email || 'kennet@octomatic.ai',
              app_metadata: { provider: 'google' },
              user_metadata: foundAuthData.user?.user_metadata || {},
              aud: 'authenticated',
              created_at: new Date().toISOString()
            }
          };
          
          authLog('Created mock session for development:', {
            userEmail: mockSession.user.email,
            userId: mockSession.user.id
          });
          
          // Set global state immediately
          globalAuthState.session = mockSession as any;
          globalAuthState.user = mockSession.user as any;
          globalAuthState.loading = false;
          
          // Set local state immediately  
          setSession(mockSession as any);
          setUser(mockSession.user as any);
          setLoading(false);
          
          authLog('Mock session state set - Global user:', globalAuthState.user?.email);
          authLog('Mock session state set - Local user:', mockSession.user.email);
          return;
        } else {
          // No auth data found, but we're in development - create a default session
          authLog('No auth data found in localStorage, creating default development session');
          
          const defaultMockSession = {
            access_token: 'dev-mock-token',
            refresh_token: 'dev-mock-refresh',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            user: {
              id: '57cbd069-f054-4b86-bbcf-a2571ef77a27',
              email: 'kennet@octomatic.ai',
              app_metadata: { provider: 'google' },
              user_metadata: {},
              aud: 'authenticated',
              created_at: new Date().toISOString()
            }
          };
          
          authLog('Created default mock session for development:', {
            userEmail: defaultMockSession.user.email,
            userId: defaultMockSession.user.id
          });
          
          // Set global state immediately
          globalAuthState.session = defaultMockSession as any;
          globalAuthState.user = defaultMockSession.user as any;
          globalAuthState.loading = false;
          
          // Set local state immediately
          setSession(defaultMockSession as any);
          setUser(defaultMockSession.user as any);
          setLoading(false);
          
          authLog('Default mock session state set - Global user:', globalAuthState.user?.email);
          authLog('Default mock session state set - Local user:', defaultMockSession.user.email);
          return;
        }
      }
      
      // Production mode or no stored data: try to get session normally
      const storedSession = localStorage.getItem('gdpr-auth-token');
      authLog('Stored session in localStorage:', storedSession ? 'exists' : 'none');
      
      // Add timeout to prevent hanging on getSession
      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('getSession timeout after 5 seconds')), 5000)
      );
      
      const { data: { session }, error } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]) as any;
      
      if (error) {
        authLog('Error getting session:', error);
      } else {
        authLog('Initial session result:', {
          hasSession: !!session,
          userEmail: session?.user?.email || 'no user',
          accessToken: session?.access_token ? 'present' : 'missing',
          expiresAt: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'no expiry',
          provider: session?.user?.app_metadata?.provider || 'no provider'
        });
        
        globalAuthState.session = session;
        globalAuthState.user = session?.user ?? null;
        setSession(session);
        setUser(session?.user ?? null);
      }
    } catch (error) {
      authLog('Error in getSession:', error);
    }

    // Set up auth state change listener - only once globally
    if (!globalAuthState.subscription) {
      authLog('Setting up global auth state change listener');
      
      const isDevelopment = window.location.hostname === 'localhost';
      
      if (isDevelopment) {
        // In development, we don't need the real auth listener since we're using mock sessions
        authLog('Development mode: Skipping auth state listener setup');
        globalAuthState.subscription = { unsubscribe: () => {} }; // Mock subscription
      } else {
        // Production: Set up real auth state listener
        globalAuthState.subscription = supabase.auth.onAuthStateChange(
          async (event, session) => {
            authLog('Auth state changed:', {
              event,
              userEmail: session?.user?.email || 'no user',
              hasSession: !!session,
              accessToken: session?.access_token ? 'present' : 'missing',
              provider: session?.user?.app_metadata?.provider || 'no provider',
              sessionId: session?.user?.id || 'no id'
            });
            
            // Update global state
            globalAuthState.session = session;
            globalAuthState.user = session?.user ?? null;
            globalAuthState.loading = false;
            
            // Update local state for all components
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
            
            // Handle provider tokens if needed (for API calls to OAuth providers)
            if (session && session.provider_token) {
              authLog('Storing provider token');
              localStorage.setItem('oauth_provider_token', session.provider_token);
            }
            
            if (session && session.provider_refresh_token) {
              authLog('Storing provider refresh token');
              localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
            }
            
            if (event === 'SIGNED_OUT') {
              authLog('User signed out - cleaning up tokens');
              localStorage.removeItem('oauth_provider_token');
              localStorage.removeItem('oauth_provider_refresh_token');
            }
            
            // Handle post-auth actions
            if (event === 'SIGNED_IN' && session?.user) {
              authLog('User signed in successfully, creating/updating profile...');
              // Create or update user profile (but don't let it block the UI)
              createOrUpdateUserProfile(session.user).catch(error => {
                authLog('Profile creation failed (non-blocking):', error);
              });
            }
            
            authLog('Auth state change processing complete');
          }
        );
      }
    } else {
      authLog('Auth state change listener already exists');
    }

    // Set loading to false
    authLog('Setting loading to false');
    globalAuthState.loading = false;
    setLoading(false);
  };

  // Sync with global state changes (for StrictMode compatibility)
  useEffect(() => {
    if (!globalAuthState.initialized) return;

    const syncInterval = setInterval(() => {
      let hasChanges = false;
      
      if (globalAuthState.user !== user) {
        authLog(`Syncing user: ${globalAuthState.user?.email || 'null'} (was: ${user?.email || 'null'})`);
        setUser(globalAuthState.user);
        hasChanges = true;
      }
      if (globalAuthState.session !== session) {
        authLog(`Syncing session: ${globalAuthState.session?.user?.email || 'null'} (was: ${session?.user?.email || 'null'})`);
        setSession(globalAuthState.session);
        hasChanges = true;
      }
      if (globalAuthState.loading !== loading) {
        authLog(`Syncing loading: ${globalAuthState.loading} (was: ${loading})`);
        setLoading(globalAuthState.loading);
        hasChanges = true;
      }
      
      if (hasChanges) {
        authLog('State sync completed');
      }
    }, 100);

    return () => clearInterval(syncInterval);
  }, [user, session, loading]);

  const createOrUpdateUserProfile = async (user: User) => {
    try {
      authLog('Creating/updating user profile for:', user.email);
      
      // Check if user profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        authLog('Error fetching user profile:', fetchError);
        return;
      }

      if (!existingProfile) {
        authLog('Creating new user profile');
        // Create new user profile
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            email: user.email || '',
            first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
            last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            // Extract additional info from OAuth providers
            ...(user.app_metadata?.provider === 'google' && {
              first_name: user.user_metadata?.given_name || user.user_metadata?.full_name?.split(' ')[0] || '',
              last_name: user.user_metadata?.family_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            }),
            ...(user.app_metadata?.provider === 'azure' && {
              first_name: user.user_metadata?.given_name || user.user_metadata?.full_name?.split(' ')[0] || '',
              last_name: user.user_metadata?.family_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            }),
          });

        if (insertError) {
          authLog('Error creating user profile:', insertError);
        } else {
          authLog('User profile created successfully');
        }
      } else {
        authLog('User profile already exists');
      }
    } catch (error) {
      authLog('Error in createOrUpdateUserProfile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Redirect to the checklist page after successful login
          emailRedirectTo: `${window.location.origin}/checklist`,
        },
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/checklist`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signInWithAzure = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/checklist`,
          scopes: 'email',
        },
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithMagicLink,
    signInWithGoogle,
    signInWithAzure,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 