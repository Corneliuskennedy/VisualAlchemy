import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-[#4585f4] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback; 