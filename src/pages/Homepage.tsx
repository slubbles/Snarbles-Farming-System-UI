import { useNavigate } from 'react-router-dom';
import { Tractor, Leaf, Sprout, Droplet, Sparkles, Trophy, ArrowRight, Users, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Homepage = () => {
  const navigate = useNavigate();
  
  const openApp = () => {
    navigate('/index');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground farm-background overflow-x-hidden">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">Snarbles</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-amber-500 to-pink-500 hover:opacity-90 text-white"
            >
              Explore App
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              Play, Plant, Grow, <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Earn Rewards</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Snarbles combines strategic farming with blockchain rewards. Every seed you plant and nurture represents real value in our ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={openApp}
                className="bg-gradient-to-r from-amber-500 to-pink-500 hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
              >
                Explore App <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-pink-500 text-pink-500 hover:bg-pink-500/10 text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"></div>
          <div className="absolute top-20 -left-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl"></div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm" id="about">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How Snarbles Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join our vibrant farming community where strategy meets rewards. Every action you take contributes to your growing empire.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-amber-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                    <Sprout className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Obtain Seeds</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete exciting community challenges and earn seeds as tokens of your contribution and effort.
                  </p>
                  <div className="flex items-center text-amber-500 text-sm font-medium">
                    <span>View Challenges</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                    <Droplet className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. Plant & Water</h3>
                  <p className="text-muted-foreground mb-4">
                    Transform your virtual land by planting seeds and nurturing them through their growing phase of 1-3 days.
                  </p>
                  <div className="flex items-center text-blue-500 text-sm font-medium">
                    <span>Explore Farming</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-pink-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Harvest Rewards</h3>
                  <p className="text-muted-foreground mb-4">
                    When your crops mature, collect your well-earned rewards that represent your dedication and strategy.
                  </p>
                  <div className="flex items-center text-pink-500 text-sm font-medium">
                    <span>Learn About Rewards</span>
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
            <div className="glass-panel p-12 max-w-4xl mx-auto bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Snarbles Story</h2>
              <div className="text-lg space-y-6">
                <p>
                  Snarbles began with a simple vision: create a digital farming experience where your efforts truly shape your rewards.
                </p>
                <p>
                  We designed a world where patience and strategy lead to meaningful growth—a digital garden that rewards thoughtful cultivation over random chance.
                </p>
                <p>
                  Today, Snarbles stands as a vibrant community of digital farmers who understand that true value comes from dedication, care, and strategic thinking.
                </p>
                <p className="font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent inline-block">
                  Join us in growing something amazing together.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore the unique elements that make the Snarbles farming experience special.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Tractor className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Strategic Farming</h3>
                  <p className="text-muted-foreground">
                    Plan your farm layout and optimize your growing strategy for maximum rewards.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Growing Cycle</h3>
                  <p className="text-muted-foreground">
                    Experience the satisfaction of watching your plants grow over a realistic 1-3 day period.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-pink-500/20 hover:border-pink-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Leaderboards</h3>
                  <p className="text-muted-foreground">
                    Showcase your farming skills and climb the ranks in our community leaderboards.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Community Growth</h3>
                  <p className="text-muted-foreground">
                    Connect with other farmers, share strategies, and grow together in our vibrant ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Farm?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join our community of digital farmers and start growing your own thriving ecosystem today.
            </p>
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-amber-500 to-pink-500 hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
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
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center">
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
