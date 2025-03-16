
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { NotificationProvider } from "@/components/ui/notifications";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Farm from "./pages/Farm";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Homepage from "./pages/Homepage";
import Admin from "./pages/Admin";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Dark Mode Initializer Component
const DarkModeInitializer = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Enhanced logic to set dark mode as default for app pages
    const isAppRoute = location.pathname === '/index' || 
                       location.pathname.startsWith('/dashboard') ||
                       location.pathname.startsWith('/farm') || 
                       location.pathname.startsWith('/tasks') ||
                       location.pathname.startsWith('/profile') || 
                       location.pathname.startsWith('/leaderboard') ||
                       location.pathname.startsWith('/admin') || 
                       location.pathname === '/app';
    
    if (isAppRoute) {
      // Set dark mode as default for app pages
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    }
  }, [location.pathname]);
  
  return null;
};

// AppContent component with unified routing
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Force dark mode when navigating to app from homepage
    if (location.pathname === '/app' || location.pathname === '/app/') {
      // Redirect to dashboard and enforce dark mode
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);
  
  return (
    <>
      <DarkModeInitializer />
      <Routes>
        {/* Landing page routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        
        {/* App pages */}
        <Route path="/index" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* App redirect */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
