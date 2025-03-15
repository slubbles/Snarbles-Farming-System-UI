
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/wallet/WalletConnect';
import { useNotificationContext } from '@/components/ui/notifications';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/' || location.pathname === '/home';
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { addNotification } = useNotificationContext();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Check if wallet is connected
  useEffect(() => {
    const checkWalletConnection = () => {
      const walletConnected = localStorage.getItem('walletConnected') === 'true';
      setIsWalletConnected(walletConnected);
    };

    checkWalletConnection();
    // Also set up an interval to check the wallet connection status
    const interval = setInterval(checkWalletConnection, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Default to dark theme
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    addNotification({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
      message: `You've switched to ${newTheme} mode.`,
      type: 'info'
    });
  };

  // Protected routes that require wallet connection
  const protectedRoutes = ['/dashboard', '/farm', '/tasks', '/profile', '/leaderboard', '/admin'];
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  if (isProtectedRoute && !isWalletConnected) {
    return (
      <div className="min-h-screen farm-background">
        <Header />
        <div className="h-[80vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4">
          <div className="mb-6 p-5 rounded-full bg-[#3EC7AA]/10">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-[#3EC7AA]"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 font-heading">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            You need to connect your wallet to access this page. Connect now to view your Snarbles data and start interacting with the platform.
          </p>
          <WalletConnect />
        </div>
        <div className="fixed bottom-4 left-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen farm-background">
      <Header />
      {children}
      <div className="fixed bottom-4 left-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};
