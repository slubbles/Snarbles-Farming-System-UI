
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

// Determine if we're in the app subdomain (app.snarbles.xyz) or main domain (snarbles.xyz)
const isAppSubdomain = window.location.hostname.startsWith('app.') || 
                        window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <ThemeToggle />
        <BrowserRouter>
          <Routes>
            {isAppSubdomain ? (
              // App subdomain routes (app.snarbles.xyz)
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/farm" element={<Farm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              // Main domain routes (snarbles.xyz)
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/index" element={<Index />} />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
