import React from 'react';
import { useAuth } from './AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, LogOut, Chrome } from 'lucide-react';

export const GoogleOAuthTest: React.FC = () => {
  const { user, session, loading, signInWithGoogle, signOut } = useAuth();

  const handleGoogleSignIn = async () => {
    console.log('🔍 Testing Google OAuth...');
    const { error } = await signInWithGoogle();
    if (error) {
      console.error('Google OAuth error:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading authentication...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            GDPR Compass V2 - OAuth Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-4">
              <Alert className="border-green-500/20 bg-green-900/20">
                <User className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  <strong>Authenticated Successfully!</strong>
                  <br />
                  Email: {user.email}
                  <br />
                  Provider: {user.app_metadata?.provider || 'Unknown'}
                  <br />
                  User ID: {user.id}
                </AlertDescription>
              </Alert>

              {session && (
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Session Info:</h4>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Access Token: {session.access_token ? 'Present' : 'Missing'}</div>
                    <div>Refresh Token: {session.refresh_token ? 'Present' : 'Missing'}</div>
                    <div>Expires: {session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'Unknown'}</div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert className="border-blue-500/20 bg-blue-900/20">
                <AlertDescription className="text-blue-300">
                  Test the Google OAuth integration for GDPR Compass V2. 
                  This will redirect you to Google for authentication.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleGoogleSignIn}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Sign in with Google
              </Button>

              <div className="text-center text-xs text-gray-400">
                <p>
                  This test uses the GDPR Supabase project with V2 database schema.
                  <br />
                  Local development environment.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleOAuthTest; 