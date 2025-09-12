import React from 'react';
import { Loader2, Database, CheckCircle2, AlertTriangle, Zap, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <Loader2 
      className={`animate-spin text-green-400 ${sizeClasses[size]} ${className}`} 
    />
  );
};

interface LoadingStateProps {
  message?: string;
  submessage?: string;
  variant?: 'default' | 'auth' | 'data' | 'processing';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  submessage,
  variant = 'default',
  className = ''
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'auth':
        return {
          icon: <Users className="h-8 w-8 text-blue-400" />,
          defaultMessage: 'Authenticating...',
          defaultSubmessage: 'Verifying your credentials'
        };
      case 'data':
        return {
          icon: <Database className="h-8 w-8 text-green-400" />,
          defaultMessage: 'Loading data...',
          defaultSubmessage: 'Fetching your compliance information'
        };
      case 'processing':
        return {
          icon: <Zap className="h-8 w-8 text-yellow-400" />,
          defaultMessage: 'Processing...',
          defaultSubmessage: 'Evaluating GDPR rules'
        };
      default:
        return {
          icon: <LoadingSpinner size="lg" />,
          defaultMessage: 'Loading...',
          defaultSubmessage: 'Please wait'
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative mb-4">
        {config.icon}
        {variant !== 'default' && (
          <div className="absolute -bottom-1 -right-1">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">
        {message || config.defaultMessage}
      </h3>
      <p className="text-sm text-gray-400 text-center max-w-sm">
        {submessage || config.defaultSubmessage}
      </p>
    </div>
  );
};

interface SkeletonCardProps {
  count?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  count = 1, 
  className = '' 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className={`bg-gray-900 border-gray-800 ${className}`}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-3 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 bg-gray-800 rounded animate-pulse w-5/6" />
              <div className="h-8 bg-gray-800 rounded animate-pulse mt-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

interface ProgressLoadingProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const ProgressLoading: React.FC<ProgressLoadingProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <LoadingSpinner size="lg" className="mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          Processing Your Request
        </h3>
        <p className="text-sm text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index < currentStep 
                ? 'bg-green-600 text-white' 
                : index === currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {index < currentStep ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : index === currentStep ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>
            <span className={`text-sm ${
              index <= currentStep ? 'text-white' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 