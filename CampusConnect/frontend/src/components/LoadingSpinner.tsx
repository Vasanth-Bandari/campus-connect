import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
  fullHeight = true,
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${
        fullHeight ? 'min-h-[300px]' : ''
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-ping rounded-full bg-primary-500/20 w-12 h-12"></div>
        <Loader2 className={`${sizeMap[size]} text-primary-500 animate-spin`} />
      </div>
      {message && <p className="mt-4 text-sm font-medium text-slate-400">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
