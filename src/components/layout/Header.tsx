
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/utils/taskData';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckCircle className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-snarbles-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Snarbles</span>
              <div className="point-badge animate-pulse-scale ml-2">
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
                        ? "text-snarbles-red font-medium"
                        : "text-snarbles-gray-700 hover:text-snarbles-red"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-snarbles-gray-800 focus:outline-none"
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
        <nav className="md:hidden bg-white border-b border-snarbles-gray-200 animate-slide-in">
          <ul className="px-4 py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 py-4 border-b border-snarbles-gray-100",
                    isActive(item.path)
                      ? "text-snarbles-red font-medium"
                      : "text-snarbles-gray-700"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
