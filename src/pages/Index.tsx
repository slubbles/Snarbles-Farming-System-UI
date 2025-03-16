
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Award, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { currentUser } from '@/utils/taskData';
import ProgressBar from '@/components/ui/ProgressBar';
import { Layout } from '@/components/layout/Layout';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Welcome to Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Productivity Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your progress, complete tasks, and watch your rewards grow in the Snarbles ecosystem.
            </p>
            <Button 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/tasks')}
            >
              View Tasks <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl shadow-sm animate-slide-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full">
                  <Award className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="text-xl font-semibold">Your Points</h3>
              </div>
              <p className="text-3xl font-bold mb-4">
                {currentUser.totalPoints.toLocaleString()}
              </p>
              <div className="text-sm text-muted-foreground">
                Level {currentUser.level}
              </div>
              <ProgressBar 
                value={currentUser.totalPoints % 1000} 
                max={1000} 
                showText={true} 
                className="mt-2"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                {1000 - (currentUser.totalPoints % 1000)} points until Level {currentUser.level + 1}
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl shadow-sm animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold">Task Progress</h3>
              </div>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold">
                  {currentUser.taskStats.completed}
                </p>
                <span className="text-muted-foreground">
                  Tasks Completed
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xl font-medium">
                  {currentUser.taskStats.inProgress}
                </p>
                <span className="text-muted-foreground">
                  In Progress
                </span>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl shadow-sm animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Achievements</h3>
              </div>
              <p className="text-3xl font-bold mb-4">
                {Math.floor(currentUser.taskStats.completed / 5)}
              </p>
              <div className="text-sm text-muted-foreground">
                Badges Earned
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
                  onClick={() => navigate('/profile')}
                >
                  View Achievements
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section className="py-12 max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center animate-slide-in bg-gradient-to-br from-violet-500/5 to-indigo-500/5" style={{ animationDelay: '0.3s' }}>
            <MapPin className="h-12 w-12 mb-6 mx-auto text-violet-500" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Continue Your Journey
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore available tasks, tend to your farm, and track your performance on the leaderboard. Every action brings you closer to your goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white px-6 py-2 rounded-lg"
                onClick={() => navigate('/tasks')}
              >
                Tasks <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 px-6 py-2 rounded-lg"
                onClick={() => navigate('/farm')}
              >
                Farm <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 px-6 py-2 rounded-lg"
                onClick={() => navigate('/leaderboard')}
              >
                Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
