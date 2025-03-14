
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className, size = 32 }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="50" height="50" rx="10" fill="url(#logo-gradient)" />
        <path d="M15 35C15 28.5 20 25 25 25C30 25 35 28.5 35 35" stroke="white" strokeWidth="2" />
        <circle cx="25" cy="18" r="8" stroke="white" strokeWidth="2" />
        <path d="M35 22C38 25 40 28 40 32" stroke="white" strokeWidth="2" />
        <path d="M15 22C12 25 10 28 10 32" stroke="white" strokeWidth="2" />
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DB87F" />
            <stop offset="1" stopColor="#0D6B36" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold bg-gradient-to-br from-[#2DB87F] to-[#0D6B36] bg-clip-text text-transparent">Snarbles</span>
    </div>
  );
};

export default Logo;
