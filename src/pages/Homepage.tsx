
import { useNavigate } from 'react-router-dom';
import { Tractor, Leaf, Sprout, Droplet, Sparkles, Trophy, ArrowRight, Users, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Homepage = () => {
  const navigate = useNavigate();
  
  const openApp = () => {
    // Set dark theme in localStorage before navigating
    localStorage.setItem('theme', 'dark');
    navigate('/index');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground farm-background overflow-x-hidden">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">Snarbles</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white"
            >
              Explore App
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              Transform Tasks into <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Tangible Rewards</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Snarbles isn't just another task tracker—it's a gamified ecosystem where your productivity directly translates to growth and rewards you can actually use.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={openApp}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute top-20 -left-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl"></div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm" id="about">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Users Love Snarbles</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unlike traditional productivity apps, Snarbles creates a dynamic ecosystem where completing tasks has real impact on your digital garden's growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-violet-500/20 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-6">
                    <Sprout className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Track Goals & Progress</h3>
                  <p className="text-muted-foreground mb-4">
                    Set meaningful targets, track your progress in real-time, and celebrate milestones with visualized achievements.
                  </p>
                  <div className="flex items-center text-violet-500 text-sm font-medium">
                    <span>Powerful Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-500/20 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
                    <Droplet className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. Earn & Invest Points</h3>
                  <p className="text-muted-foreground mb-4">
                    Every completed task earns points that can be strategically invested into your digital farm for exponential growth.
                  </p>
                  <div className="flex items-center text-indigo-500 text-sm font-medium">
                    <span>Point System</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-violet-600/20 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-600/10 blur-2xl group-hover:bg-violet-600/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-violet-600/10 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Unlock Premium Rewards</h3>
                  <p className="text-muted-foreground mb-4">
                    Convert your achievements into tangible benefits—exclusive content, discounts, and real-world perks await top performers.
                  </p>
                  <div className="flex items-center text-violet-600 text-sm font-medium">
                    <span>Reward Marketplace</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Success Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-panel p-12 max-w-4xl mx-auto bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Transform Your Productivity</h2>
              <div className="text-lg space-y-6">
                <p>
                  "I've tried dozens of productivity systems, but Snarbles is the first that actually kept me engaged long-term. The reward system makes a real difference." 
                </p>
                <p>
                  By turning mundane tasks into strategic growth opportunities, we've created a productivity ecosystem that actually makes you want to get things done.
                </p>
                <p>
                  Our users report an average 47% increase in task completion after just two weeks of using Snarbles—not because they have to, but because they're motivated by the tangible results they see.
                </p>
                <p className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                  Join thousands already transforming their productivity into measurable results.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Features That Drive Results</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Carefully designed tools that transform how you approach tasks and productivity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Tractor className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Smart Task Tracking</h3>
                  <p className="text-muted-foreground">
                    Our intelligent system adapts to your work patterns, suggesting optimal times and approaches for maximum productivity.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Progress Visualization</h3>
                  <p className="text-muted-foreground">
                    Watch your achievements grow through engaging visual representations that make progress tangible and satisfying.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-600/20 hover:border-indigo-600/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Leaderboard Competition</h3>
                  <p className="text-muted-foreground">
                    Challenge yourself against others, climbing the ranks as you achieve more and unlock exclusive champion-only rewards.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-violet-600/20 hover:border-violet-600/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-violet-600/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Team Synergy</h3>
                  <p className="text-muted-foreground">
                    Multiply your productivity by connecting with like-minded achievers who boost your performance through shared goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Achieving More Today</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              No more abandoned to-do lists or forgotten goals. Experience the Snarbles difference—where productivity meets motivation in a system designed for lasting results.
            </p>
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              Explore App <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">Snarbles</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Snarbles. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      <ThemeToggle />
    </div>
  );
};

export default Homepage;
