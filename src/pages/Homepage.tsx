
import { useNavigate } from 'react-router-dom';
import { Tractor, BarChart3, Trophy, ArrowRight, Sparkles, Leaf, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { currentUser } from '@/utils/taskData';
import ProgressBar from '@/components/ui/ProgressBar';

const Homepage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Tractor className="h-10 w-10 text-[#2DB87F]" />,
      title: "Farm Management",
      description: "Plant, grow, and harvest crops in your virtual farm. Manage resources efficiently to maximize yield.",
      action: () => navigate('/farm')
    },
    {
      icon: <Calendar className="h-10 w-10 text-[#2DB87F]" />,
      title: "Task Tracking",
      description: "Keep track of your daily and weekly farming tasks. Complete them to earn points and unlock rewards.",
      action: () => navigate('/tasks')
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-[#2DB87F]" />,
      title: "Progress Analytics",
      description: "View detailed analytics of your farming progress over time. Identify trends and optimize your strategy.",
      action: () => navigate('/dashboard')
    },
    {
      icon: <Trophy className="h-10 w-10 text-[#2DB87F]" />,
      title: "Leaderboards",
      description: "Compete with other farmers and climb the rankings. Show off your farming skills and earn recognition.",
      action: () => navigate('/leaderboard')
    }
  ];

  return (
    <div className="min-h-screen farm-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
              Optimize Your <span className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] bg-clip-text text-transparent">Snarbles Farming</span> Strategy
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your progress, manage your farm, and compete with other farmers to become the ultimate Snarbles farming master.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-6 py-6 rounded-xl shadow-lg"
                onClick={() => navigate('/farm')}
              >
                Start Farming <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="text-lg px-6 py-6 rounded-xl border-[#2DB87F]/50 hover:bg-[#2DB87F]/10"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Leaf className="h-8 w-8 text-[#2DB87F] mb-2" />
                  <h3 className="text-lg font-semibold">Current Level</h3>
                  <p className="text-3xl font-bold mt-1">{currentUser.level}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Trophy className="h-8 w-8 text-amber-500 mb-2" />
                  <h3 className="text-lg font-semibold">Total Points</h3>
                  <p className="text-3xl font-bold mt-1">{currentUser.totalPoints.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-[#2DB87F] mb-2" />
                  <h3 className="text-lg font-semibold">Tasks Completed</h3>
                  <p className="text-3xl font-bold mt-1">{currentUser.taskStats.completed}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Tractor className="h-8 w-8 text-[#2DB87F] mb-2" />
                  <h3 className="text-lg font-semibold">Farm Score</h3>
                  <p className="text-3xl font-bold mt-1">78<span className="text-lg text-muted-foreground">/100</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 font-heading text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 hover:border-[#2DB87F]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={feature.action}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="p-4 rounded-xl bg-[#2DB87F]/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-center md:text-left">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-center md:text-left">
                        {feature.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="text-[#2DB87F] hover:text-[#2DB87F] hover:bg-[#2DB87F]/10"
                        onClick={feature.action}
                      >
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Progress Section */}
        <section className="py-8 mb-16">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 font-heading">Track Your Progress</h2>
                <p className="text-muted-foreground mb-6">
                  Keep track of your farming progress, earn points for completing tasks, and level up your farming abilities. The more you farm, the more rewards you unlock!
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Level Progress</span>
                      <span>{currentUser.totalPoints % 1000} / 1000</span>
                    </div>
                    <ProgressBar 
                      value={currentUser.totalPoints % 1000} 
                      max={1000}
                      className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36]" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasks Completion</span>
                      <span>{currentUser.taskStats.completed} / {currentUser.taskStats.completed + currentUser.taskStats.inProgress}</span>
                    </div>
                    <ProgressBar 
                      value={currentUser.taskStats.completed} 
                      max={currentUser.taskStats.completed + currentUser.taskStats.inProgress} 
                      variant="success"
                      className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36]"
                    />
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90"
                  onClick={() => navigate('/dashboard')}
                >
                  View Full Dashboard
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -top-6 -right-6 rounded-full bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] p-4 animate-pulse">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-[#2DB87F]/20 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Tractor className="h-5 w-5 text-[#2DB87F]" />
                          <span className="font-medium">Plant Wheat Seeds</span>
                        </div>
                        <span className="text-[#2DB87F]">+250 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-[#2DB87F]" />
                          <span className="font-medium">7-Day Streak</span>
                        </div>
                        <span className="text-[#2DB87F]">+500 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span className="font-medium">Top 10 Farmer</span>
                        </div>
                        <span className="text-[#2DB87F]">+1000 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Ready to Start Farming?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and start optimizing your Snarbles farming strategy today. Track your progress, compete with others, and become the best farmer in the community!
          </p>
          <Button 
            className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
            onClick={() => navigate('/farm')}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
