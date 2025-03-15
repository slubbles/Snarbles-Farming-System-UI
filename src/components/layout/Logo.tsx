
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
        <path d="M15 35C15 28.5 20 25 25 25C30 25 35 28.5 35 35" stroke="white" strokeWidth="2.5" />
        <path d="M25 15C27.7614 15 30 17.2386 30 20C30 22.7614 27.7614 25 25 25C22.2386 25 20 22.7614 20 20C20 17.2386 22.2386 15 25 15Z" stroke="white" strokeWidth="2.5" />
        <path d="M35 20C37.5 23 39 27 40 30" stroke="white" strokeWidth="2.5" />
        <path d="M15 20C12.5 23 11 27 10 30" stroke="white" strokeWidth="2.5" />
        <path d="M25 10C20 10 15 15 15 20" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M25 10C30 10 35 15 35 20" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3EC7AA" />
            <stop offset="1" stopColor="#0D6B36" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold bg-gradient-to-br from-[#3EC7AA] to-[#0D6B36] bg-clip-text text-transparent">Snarbles</span>
    </div>
  );
};

export default Logo;
