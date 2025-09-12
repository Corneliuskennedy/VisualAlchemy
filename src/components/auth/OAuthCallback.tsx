import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OAuthCallback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Debug: Log all URL parameters
        console.log('OAuth Callback - Full URL:', window.location.href);
        console.log('OAuth Callback - Search params:', Object.fromEntries(searchParams));
        
        // Parse hash fragment parameters (for implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        console.log('OAuth Callback - Hash params:', Object.fromEntries(hashParams));
        
        // Check for authorization code flow (query params)
        const code = searchParams.get('code');
        const error_code = searchParams.get('error');
        const error_description = searchParams.get('error_description');
        
        // Check for implicit flow (hash params)
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');
        const expires_at = hashParams.get('expires_at');
        
        console.log('OAuth Callback - Extracted params:', {
          code: code ? 'present' : 'missing',
          access_token: access_token ? 'present' : 'missing',
          refresh_token: refresh_token ? 'present' : 'missing',
          error_code,
          error_description
        });

        // Handle OAuth errors
        if (error_code) {
          console.error('OAuth error:', error_code, error_description);
          setError(error_description || error_code);
          setStatus('error');
          return;
        }

        // Handle implicit flow (tokens in hash fragment)
        if (access_token && refresh_token) {
          console.log('OAuth implicit flow detected, setting session...');
          console.log('Session data:', { 
            access_token: access_token.substring(0, 20) + '...', 
            refresh_token: refresh_token.substring(0, 20) + '...',
            expires_at 
          });
          
          try {
            // Use setSession directly - this should work with the GDPR client
            console.log('Setting session with OAuth tokens...');
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });
            
            if (sessionError) {
              console.error('Session set error:', sessionError);
              setError('Failed to establish session: ' + sessionError.message);
              setStatus('error');
              return;
            }

            if (data.session) {
              console.log('OAuth login successful:', data.session.user?.email);
              setStatus('success');
              
              // Clear the hash from URL to clean up
              window.history.replaceState(null, '', window.location.pathname);
              
              // Short delay to let the AuthProvider update
              setTimeout(() => {
                console.log('Redirecting to checklist...');
                router.replace('/checklist');
              }, 1500);
            } else {
              console.error('No session in setSession response');
              setError('Authentication completed but no session was created.');
              setStatus('error');
            }
          } catch (sessionSetError) {
            console.error('Exception during session setup:', sessionSetError);
            setError('Failed to establish session: ' + (sessionSetError instanceof Error ? sessionSetError.message : 'Unknown error'));
            setStatus('error');
          }
        }
        // Handle authorization code flow (code in query params)
        else if (code) {
          console.log('OAuth code received, exchanging for session...');
          const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (sessionError) {
            console.error('Session exchange error:', sessionError);
            setError(sessionError.message);
            setStatus('error');
            return;
          }

          if (data.session) {
            console.log('OAuth login successful (code flow):', data.session.user?.email);
            setStatus('success');
            
            // Redirect to checklist after a brief success message
            setTimeout(() => {
              router.replace('/checklist');
            }, 2000);
          } else {
            setError('No session received from OAuth provider');
            setStatus('error');
          }
        } else {
          // No valid OAuth parameters found
          console.error('OAuth Callback - No valid OAuth parameters found');
          setError('No valid OAuth parameters received. This may be a direct access to the callback URL.');
          setStatus('error');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setStatus('error');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.replace('/checklist');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
            </div>
            <CardTitle className="text-white">Completing Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-400">
              Please wait while we complete your authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-white">Sign In Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-400">
              You have been successfully signed in. Redirecting to your dashboard...
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-white">Sign In Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-600 bg-red-900/20">
              <AlertDescription className="text-red-400">
                {error || 'An error occurred during sign in. Please try again.'}
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Button
                onClick={handleRetry}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue to Dashboard
              </Button>
              
              <Button
                onClick={() => router.replace('/')}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Return to Home
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              If you continue to experience issues, please contact support.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}; 