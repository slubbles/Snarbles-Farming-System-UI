
import { useNavigate } from 'react-router-dom';
import { Tractor, Leaf, Sprout, Droplet, Sparkles, Trophy, ArrowRight, Users, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Homepage = () => {
  const navigate = useNavigate();
  
  const openApp = () => {
    // In a real app, we would redirect to app.snarbles.xyz
    // For now, redirect to /dashboard
    window.location.href = window.location.hostname.includes('localhost') 
      ? '/dashboard' 
      : 'https://app.snarbles.xyz';
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground farm-background overflow-x-hidden">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">Snarbles</span>
          </div>
          
          <Button 
            onClick={openApp}
            className="wallet-connect-btn"
          >
            Launch App
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              A Web3 Farming Game <span className="green-gradient-text">Where Everything is Earned</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              In a blockchain world of airdrop hunters and reward farmers, Snarbles is built on a simple principle: real work, real rewards. No shortcuts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={openApp}
                className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
              >
                Start Farming <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-[#3EC7AA] text-[#3EC7AA] hover:bg-[#3EC7AA]/10 text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#3EC7AA]/10 blur-3xl"></div>
          <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#3EC7AA]/10 blur-3xl"></div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm" id="about">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How Snarbles Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unlike other platforms, Snarbles is built around effort and strategy. Every seed planted, every crop harvested represents real work in the ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3EC7AA]/10 blur-2xl group-hover:bg-[#3EC7AA]/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-6">
                    <Sprout className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Obtain Seeds</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete tasks that contribute real value to the ecosystem and earn seeds as a reward for your effort.
                  </p>
                  <div className="flex items-center text-[#3EC7AA] text-sm font-medium">
                    <span>View Tasks</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3EC7AA]/10 blur-2xl group-hover:bg-[#3EC7AA]/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-6">
                    <Droplet className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. Plant & Water</h3>
                  <p className="text-muted-foreground mb-4">
                    Plant your seeds in your farm plots and water them. Each crop then enters a 1-3 day growing phase.
                  </p>
                  <div className="flex items-center text-[#3EC7AA] text-sm font-medium">
                    <span>Manage Farm</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3EC7AA]/10 blur-2xl group-hover:bg-[#3EC7AA]/20 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Harvest Rewards</h3>
                  <p className="text-muted-foreground mb-4">
                    When crops are ready, trigger an on-chain harvest to collect Testnet Points that represent your work.
                  </p>
                  <div className="flex items-center text-[#3EC7AA] text-sm font-medium">
                    <span>View Rewards</span>
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
            <div className="glass-panel p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Snarbles Origin</h2>
              <div className="text-lg space-y-6">
                <p>
                  In the early days of crypto, as airdrops rained down on those who merely held tokens, a team of builders grew disenchanted with the shallow incentives permeating Web3.
                </p>
                <p>
                  "What if we created a system where rewards directly reflected effort? Where strategy and persistence mattered more than being in the right place at the right time?"
                </p>
                <p>
                  From this question, Snarbles was born—an ecosystem where every reward is earned through dedication, strategy, and real contribution. No free handouts, no shortcuts, just the satisfaction of watching your farm flourish through your own efforts.
                </p>
                <p className="font-semibold">
                  In a world of free money, we choose to grind.
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
                Snarbles combines the best elements of farming games with blockchain technology to create a unique, effort-based experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 hover:border-[#3EC7AA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-4">
                    <Tractor className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Strategic Farming</h3>
                  <p className="text-muted-foreground">
                    Manage your resources, plan your plots, and optimize your harvests for maximum yield.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 hover:border-[#3EC7AA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Growing Cycle</h3>
                  <p className="text-muted-foreground">
                    Watch your plants grow over 1-3 days, creating a realistic farming experience that rewards patience.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 hover:border-[#3EC7AA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Leaderboards</h3>
                  <p className="text-muted-foreground">
                    Compete with other farmers and rise through the ranks as you demonstrate your farming prowess.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 hover:border-[#3EC7AA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-[#3EC7AA]/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Guilds & Referrals</h3>
                  <p className="text-muted-foreground">
                    Form alliances with other farmers, invite friends, and amplify your collective rewards.
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
              Join thousands of players who have chosen the path of real effort over free handouts. Your farming journey begins now.
            </p>
            <Button 
              onClick={openApp}
              className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
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
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] flex items-center justify-center">
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
