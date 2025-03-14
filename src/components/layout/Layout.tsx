
import React from 'react';
import Header from './Header';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="min-h-screen farm-background">
      <Header />
      {children}
      <ThemeToggle />
    </div>
  );
};
