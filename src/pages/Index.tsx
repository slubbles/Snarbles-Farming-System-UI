
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Award, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { currentUser } from '@/utils/taskData';
import ProgressBar from '@/components/ui/ProgressBar';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Complete Tasks, Earn Points, <span className="text-snarbles-red">Unlock Rewards</span>
            </h1>
            <p className="text-lg text-snarbles-gray-600 mb-8 max-w-2xl mx-auto">
              Engage with the Snarbles ecosystem, complete exciting tasks, and earn points that can be redeemed for exclusive rewards.
            </p>
            <Button 
              className="bg-snarbles-red hover:bg-snarbles-red/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/tasks')}
            >
              View Tasks <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 border-t border-snarbles-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="subtle-glass p-6 rounded-xl shadow-sm animate-slide-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-snarbles-red/10 rounded-full">
                  <Award className="h-6 w-6 text-snarbles-red" />
                </div>
                <h3 className="text-xl font-semibold">Your Points</h3>
              </div>
              <p className="text-3xl font-bold text-snarbles-gray-900 mb-4">
                {currentUser.totalPoints.toLocaleString()}
              </p>
              <div className="text-sm text-snarbles-gray-500">
                Level {currentUser.level}
              </div>
              <ProgressBar 
                value={currentUser.totalPoints % 1000} 
                max={1000} 
                showText={true} 
                className="mt-2"
              />
              <div className="mt-4 text-sm text-snarbles-gray-500">
                {1000 - (currentUser.totalPoints % 1000)} points until Level {currentUser.level + 1}
              </div>
            </div>
            
            <div className="subtle-glass p-6 rounded-xl shadow-sm animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Task Progress</h3>
              </div>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-snarbles-gray-900">
                  {currentUser.taskStats.completed}
                </p>
                <span className="text-snarbles-gray-500">
                  Tasks Completed
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xl font-medium text-snarbles-gray-700">
                  {currentUser.taskStats.inProgress}
                </p>
                <span className="text-snarbles-gray-500">
                  In Progress
                </span>
              </div>
            </div>
            
            <div className="subtle-glass p-6 rounded-xl shadow-sm animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Achievements</h3>
              </div>
              <p className="text-3xl font-bold text-snarbles-gray-900 mb-4">
                {Math.floor(currentUser.taskStats.completed / 5)}
              </p>
              <div className="text-sm text-snarbles-gray-500">
                Badges Earned
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
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
          <div className="glass-panel p-8 md:p-12 text-center animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <MapPin className="h-12 w-12 mb-6 mx-auto text-snarbles-red" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Your Snarbles Journey Today
            </h2>
            <p className="text-snarbles-gray-600 mb-8 max-w-2xl mx-auto">
              Explore available tasks, earn points, and become an active member of the Snarbles community. Track your progress and watch your rewards grow!
            </p>
            <Button 
              className="bg-snarbles-red hover:bg-snarbles-red/90 text-white px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/tasks')}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
