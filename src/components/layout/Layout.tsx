
import React from 'react';
import Header from './Header';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen farm-background">
      <Header />
      {children}
      <ThemeToggle />
    </div>
  );
};
