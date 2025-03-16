
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
              Launch App
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
              Turn Your Passion into <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Digital Harvest</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Snarbles isn't just a game—it's a rewarding journey where every action you take grows real value. Build, nurture, and reap the rewards of your digital ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={openApp}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
              >
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discover More
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How Snarbles Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A perfect blend of strategy, creativity, and rewards. Your actions in Snarbles directly translate to growth and value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-violet-500/20 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-6">
                    <Sprout className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Plant Your Seeds</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete engaging challenges to earn rare seeds that become the foundation of your digital garden.
                  </p>
                  <div className="flex items-center text-violet-500 text-sm font-medium">
                    <span>View Seed Collection</span>
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
                  <h3 className="text-xl font-bold mb-3">2. Nurture Growth</h3>
                  <p className="text-muted-foreground mb-4">
                    Cultivate your digital plants with strategy and care. Each decision influences your yield and growth trajectory.
                  </p>
                  <div className="flex items-center text-indigo-500 text-sm font-medium">
                    <span>Master Cultivation</span>
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
                  <h3 className="text-xl font-bold mb-3">3. Harvest Real Value</h3>
                  <p className="text-muted-foreground mb-4">
                    Harvest mature plants to collect valuable rewards. Your patience and strategy directly impact your earning potential.
                  </p>
                  <div className="flex items-center text-violet-600 text-sm font-medium">
                    <span>Explore Rewards</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Origin Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-panel p-12 max-w-4xl mx-auto bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Vision Behind Snarbles</h2>
              <div className="text-lg space-y-6">
                <p>
                  Snarbles began with a revolutionary idea: create a digital ecosystem where your effort, strategy, and creativity directly translate to tangible rewards.
                </p>
                <p>
                  Unlike traditional games that offer fleeting entertainment, we've built an experience where every action you take has lasting value and contributes to a thriving digital economy.
                </p>
                <p>
                  Today, Snarbles represents a new paradigm where digital gardening meets strategic value creation—a place where your passion becomes your prosperity.
                </p>
                <p className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                  Join thousands already harvesting the rewards of their digital gardens.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Players Love Snarbles</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover the features that make Snarbles a uniquely rewarding experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Tractor className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Strategic Depth</h3>
                  <p className="text-muted-foreground">
                    Make meaningful choices that affect your growth trajectory and reward potential.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Real Growth Cycle</h3>
                  <p className="text-muted-foreground">
                    Experience natural progression with realistic growing cycles that reward patience and strategy.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-600/20 hover:border-indigo-600/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Achievement System</h3>
                  <p className="text-muted-foreground">
                    Earn recognition and exclusive rewards as you hit milestones and demonstrate your farming prowess.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-violet-600/20 hover:border-violet-600/50 transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-violet-600/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Vibrant Community</h3>
                  <p className="text-muted-foreground">
                    Join a thriving ecosystem of like-minded players who share strategies and celebrate each other's growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Digital Garden Today</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of players already cultivating value in the Snarbles ecosystem. Your digital garden awaits.
            </p>
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              Launch App <ArrowRight className="ml-2 h-5 w-5" />
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
