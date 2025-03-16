
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
    // Check if coming from homepage to app
    if (location.pathname === '/index' || location.pathname.startsWith('/dashboard') ||
        location.pathname.startsWith('/farm') || location.pathname.startsWith('/tasks') ||
        location.pathname.startsWith('/profile') || location.pathname.startsWith('/leaderboard')) {
      // Set dark mode as default for app pages
      const theme = localStorage.getItem('theme');
      if (!theme) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.remove('light-mode');
      }
    }
  }, [location]);
  
  return null;
};

// AppContent component with fixed subdomain routing
const AppContent = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle app redirect
    const currentURL = window.location.href;
    if (currentURL.includes('/app')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <>
      <DarkModeInitializer />
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/index" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* App redirect */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        
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
