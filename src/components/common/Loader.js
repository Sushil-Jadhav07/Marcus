import React from 'react';

const Loader = ({ 
  size = 'md', 
  variant = 'primary', 
  showText = false, 
  text = 'Loading...', 
  className = '' 
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Variant configurations
  const variantClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-gray-500 border-t-transparent',
    success: 'border-green-500 border-t-transparent',
    warning: 'border-yellow-500 border-t-transparent',
    danger: 'border-red-500 border-t-transparent',
    gradient: 'border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
    rainbow: 'border-transparent'
  };

  // Text size based on loader size
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'gradient') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full relative overflow-hidden animate-spin`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"></div>
        </div>
        {showText && (
          <span className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'rainbow') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className={`${sizeClasses[size]} relative animate-spin`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 rounded-full opacity-50"></div>
        </div>
        {showText && (
          <span className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 ${variantClasses[variant]} rounded-full animate-spin`}
      ></div>
      {showText && (
        <span className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium`}>
          {text}
        </span>
      )}
    </div>
  );
};

// Specialized loaders for common use cases
export const ButtonLoader = ({ size = 'sm', variant = 'primary' }) => (
  <Loader size={size} variant={variant} className="inline-flex" />
);

export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader size="lg" variant="gradient" showText={true} text={text} />
  </div>
);

export const InlineLoader = ({ size = 'xs', variant = 'primary' }) => (
  <Loader size={size} variant={variant} className="inline-flex" />
);

// Pulsing dot loader
export const DotLoader = ({ size = 'md', variant = 'primary' }) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  const colors = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
    rainbow: 'bg-gradient-to-r from-red-500 to-purple-500'
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSizes[size]} ${colors[variant]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;
