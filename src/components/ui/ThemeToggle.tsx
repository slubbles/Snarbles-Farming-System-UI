
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotificationContext } from '@/components/ui/notifications';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { addNotification } = useNotificationContext();

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme as 'dark' | 'light');
      document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    } else {
      // Default to dark theme
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
    
    addNotification({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
      message: `You've switched to ${newTheme} mode.`,
      type: 'info'
    });
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 z-50 rounded-full h-10 w-10 shadow-lg backdrop-blur-sm bg-background/80 border-border"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};

export default ThemeToggle;
