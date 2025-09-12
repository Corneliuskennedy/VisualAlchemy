import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface LoginFormProps {
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, title, description }) => {
  const { signIn, signInWithMagicLink, signInWithGoogle, signInWithAzure, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<'password' | 'magic-link'>('magic-link');

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Successfully signed in!');
      onSuccess?.();
    }
    
    setIsSubmitting(false);
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const { error } = await signInWithMagicLink(email);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Magic link sent! Check your email and click the link to sign in.');
    }
    
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setError(error.message);
    }
    // Note: For OAuth, the redirect happens automatically, so we don't show success here
  };

  const handleAzureSignIn = async () => {
    setError(null);
    setSuccess(null);
    
    const { error } = await signInWithAzure();
    
    if (error) {
      setError(error.message);
    }
    // Note: For OAuth, the redirect happens automatically, so we don't show success here
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          {title || 'Welcome Back'}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {description || 'Sign in to access your GDPR compliance dashboard'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* OAuth Providers */}
        <div className="space-y-3">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button
            onClick={handleAzureSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#00BCF2" d="M0 0h11.377v11.372H0z"/>
              <path fill="#0078D4" d="M12.623 0H24v11.372H12.623z"/>
              <path fill="#00BCF2" d="M0 12.623h11.377V24H0z"/>
              <path fill="#40E0D0" d="M12.623 12.623H24V24H12.623z"/>
            </svg>
            Continue with Microsoft
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">Or</span>
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
          <Button
            type="button"
            variant={authMode === 'magic-link' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 ${authMode === 'magic-link' ? 'bg-green-600 hover:bg-green-700' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAuthMode('magic-link')}
          >
            <Mail className="w-4 h-4 mr-1" />
            Magic Link
          </Button>
          <Button
            type="button"
            variant={authMode === 'password' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 ${authMode === 'password' ? 'bg-green-600 hover:bg-green-700' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAuthMode('password')}
          >
            Password
          </Button>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={authMode === 'magic-link' ? handleMagicLinkSignIn : handlePasswordSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500"
            />
          </div>

          {authMode === 'password' && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          {error && (
            <Alert className="border-red-600 bg-red-900/20">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-600 bg-green-900/20">
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {authMode === 'magic-link' ? 'Sending Magic Link...' : 'Signing In...'}
              </>
            ) : (
              authMode === 'magic-link' ? 'Send Magic Link' : 'Sign In'
            )}
          </Button>
        </form>

        {authMode === 'magic-link' && (
          <div className="text-xs text-gray-400 text-center">
            We'll send you a secure link to sign in without a password.
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 