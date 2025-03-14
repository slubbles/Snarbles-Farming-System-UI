
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, User, Menu, X, Trophy, Tractor, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/utils/taskData';
import Logo from './Logo';
import WalletConnect from '@/components/wallet/WalletConnect';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LineChart className="h-5 w-5" /> },
    { name: 'Farm', path: '/farm', icon: <Tractor className="h-5 w-5" /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckCircle className="h-5 w-5" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <div className="point-badge animate-pulse-scale ml-2 bg-gradient-to-r from-[#2DB87F] to-[#0D6B36]">
                {currentUser.totalPoints.toLocaleString()} pts
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-1 py-2 transition-all duration-200",
                      isActive(item.path)
                        ? "text-[#2DB87F] font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Wallet Connect */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-b border-border animate-slide-in">
          <ul className="px-4 py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 py-4 border-b border-border last:border-none",
                    isActive(item.path)
                      ? "text-[#2DB87F] font-medium"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="py-4">
              <WalletConnect />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
