import React, { useState } from 'react';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { useAuth } from './AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const AuthTest: React.FC = () => {
  const { user, session, loading } = useAuth();
  const [testResults, setTestResults] = useState<any>(null);

  const testCurrentSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      setTestResults({
        success: true,
        session: data.session,
        user: data.session?.user,
        error: error
      });
      console.log('Session test results:', data);
    } catch (error) {
      setTestResults({
        success: false,
        error: error
      });
    }
  };

  const testGoogleOAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        setTestResults({
          success: false,
          error: error
        });
      }
    } catch (error) {
      console.error('OAuth test error:', error);
      setTestResults({
        success: false,
        error: error
      });
    }
  };

  const testMagicLink = async () => {
    const email = prompt('Enter email for magic link:');
    if (!email) return;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Magic link error:', error);
        setTestResults({
          success: false,
          error: error
        });
      } else {
        setTestResults({
          success: true,
          message: 'Magic link sent! Check your email.'
        });
      }
    } catch (error) {
      console.error('Magic link test error:', error);
      setTestResults({
        success: false,
        error: error
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      } else {
        setTestResults({
          success: true,
          message: 'Signed out successfully'
        });
      }
    } catch (error) {
      console.error('Sign out test error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Authentication Test Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Auth State */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Current Authentication State</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Loading</h4>
                  <p className="text-gray-300">{loading ? 'Yes' : 'No'}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-white mb-2">User</h4>
                  <p className="text-gray-300">{user ? user.email : 'Not authenticated'}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Session</h4>
                  <p className="text-gray-300">{session ? 'Active' : 'None'}</p>
                </div>
              </div>
            </div>

            {/* Test Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Test Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button onClick={testCurrentSession} variant="outline">
                  Check Current Session
                </Button>
                <Button onClick={testGoogleOAuth} className="bg-blue-600 hover:bg-blue-700">
                  Test Google OAuth
                </Button>
                <Button onClick={testMagicLink} className="bg-purple-600 hover:bg-purple-700">
                  Test Magic Link
                </Button>
                <Button onClick={signOut} variant="destructive">
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Test Results</h3>
                <Alert className={testResults.success ? "border-green-600 bg-green-900/20" : "border-red-600 bg-red-900/20"}>
                  <AlertDescription className={testResults.success ? "text-green-400" : "text-red-400"}>
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(testResults, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Direct Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Direct Links</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">OAuth URL: </span>
                  <a 
                    href="http://127.0.0.1:54321/auth/v1/authorize?provider=google&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback"
                    className="text-blue-400 hover:text-blue-300 break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://127.0.0.1:54321/auth/v1/authorize?provider=google&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback
                  </a>
                </div>
                <div>
                  <span className="text-gray-400">Checklist: </span>
                  <a 
                    href="/checklist"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    /checklist
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 