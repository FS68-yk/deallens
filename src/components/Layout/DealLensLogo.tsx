import React from 'react';

interface DealLensLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'monochrome';
  showText?: boolean;
}

const DealLensLogo: React.FC<DealLensLogoProps> = ({ 
  size = 'medium', 
  variant = 'default',
  showText = true
}) => {
  // Size mappings
  const sizeMap = {
    small: {
      container: 24,
      fontSize: 'text-sm',
      nameSpace: 'ml-1.5'
    },
    medium: {
      container: 32,
      fontSize: 'text-lg',
      nameSpace: 'ml-2'
    },
    large: {
      container: 48,
      fontSize: 'text-2xl',
      nameSpace: 'ml-3'
    }
  };
  
  // Color definitions - Blue-focused design
  const colors = variant === 'default' ? {
    primary: '#0A4D92', // Darker blue 
    secondary: '#1976D2', // Medium blue
    accent: '#64B5F6',   // Light blue
    highlight: '#2196F3'  // Bright blue
  } : {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    accent: '#FFFFFF',
    highlight: '#FFFFFF'
  };
  
  const width = sizeMap[size].container;
  const height = sizeMap[size].container;
  
  return (
    <div className="flex items-center">
      <div className="relative" style={{ width, height }}>
        {/* The abstract lens visualization */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pulse-blue"
        >
          {/* Outer lens circle */}
          <circle cx="24" cy="24" r="22" fill={colors.primary} opacity="0.15" />
          
          {/* Inner lens with gradient */}
          <circle cx="24" cy="24" r="16" fill={colors.primary} />
          
          {/* Lens reflection highlight */}
          <path
            d="M18 16C20.5 13.5 24 12.5 28 14C32 15.5 34 20 32 24.5C30 29 24 31 19 28.5C14 26 14 19.5 18 16Z"
            fill={colors.highlight}
            opacity="0.4"
          />
          
          {/* Data stream 1 */}
          <path
            d="M6 28C12 22 15 22 18 26C21 30 24 30 30 24"
            stroke={colors.accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Data stream 2 */}
          <path
            d="M8 18C14 24 18 24 22 20C26 16 30 16 36 22"
            stroke={colors.highlight}
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Focal point */}
          <circle cx="24" cy="24" r="4" fill={colors.accent} opacity="0.9" />
        </svg>
      </div>
      
      {showText && (
        <div className={`font-bold tracking-tight ${sizeMap[size].fontSize} ${sizeMap[size].nameSpace} ${variant === 'default' ? 'text-primary-800' : 'text-white'}`}>
          DealLens
        </div>
      )}
    </div>
  );
};

export default DealLensLogo;