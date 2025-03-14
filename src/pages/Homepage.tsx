
import { useNavigate } from 'react-router-dom';
import { Tractor, BarChart3, Trophy, ArrowRight, Sparkles, Leaf, Calendar, Wallet, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { currentUser } from '@/utils/taskData';
import ProgressBar from '@/components/ui/ProgressBar';
import WalletConnect from '@/components/wallet/WalletConnect';

const Homepage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Tractor className="h-10 w-10 text-[#2DB87F]" />,
      title: "Strategic Farm Management",
      description: "Plant, water, and harvest your digital crops. Every decision matters in your journey to becoming a master farmer.",
      action: () => navigate('/farm')
    },
    {
      icon: <Zap className="h-10 w-10 text-[#2DB87F]" />,
      title: "Earn Real Rewards",
      description: "Complete tasks to earn seeds and Testnet Points. No free handouts—every reward is earned through your dedication and strategy.",
      action: () => navigate('/tasks')
    },
    {
      icon: <Trophy className="h-10 w-10 text-[#2DB87F]" />,
      title: "Competitive Leaderboards",
      description: "Climb the ranks and showcase your farming prowess. Compete against other farmers and earn recognition for your skills.",
      action: () => navigate('/leaderboard')
    },
    {
      icon: <Wallet className="h-10 w-10 text-[#2DB87F]" />,
      title: "Web3 Integration",
      description: "Connect your wallet and experience a new generation of farming games. On-chain harvesting means your achievements are truly yours.",
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <Layout>
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
              Grind, Grow, <span className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] bg-clip-text text-transparent">Gain</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Snarbles is not just another farming game—it's a strategic ecosystem where your effort translates to real rewards. No handouts, only opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-6 py-6 rounded-xl shadow-lg"
                onClick={() => navigate('/farm')}
              >
                Start Your Farm <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <WalletConnect />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 font-heading text-center">How Snarbles Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#2DB87F]/10 p-4 mb-4">
                    <Calendar className="h-8 w-8 text-[#2DB87F]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Complete Tasks</h3>
                  <p className="text-muted-foreground">
                    Earn seeds by completing Zealy-style tasks. Each task completed gives you resources to grow your farm.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#2DB87F]/10 p-4 mb-4">
                    <Leaf className="h-8 w-8 text-[#2DB87F]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. Farm Strategically</h3>
                  <p className="text-muted-foreground">
                    Plant your seeds, water them daily, and watch them grow over 1-3 days. Your strategy determines your success.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#2DB87F]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#2DB87F]/10 p-4 mb-4">
                    <Sparkles className="h-8 w-8 text-[#2DB87F]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Harvest Rewards</h3>
                  <p className="text-muted-foreground">
                    Trigger on-chain harvests to collect Testnet Points and other rewards. Every harvest represents real achievement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 font-heading text-center">Why Snarbles?</h2>
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
        
        {/* Testimonials/Proof Section */}
        <section className="py-8 mb-16">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 font-heading">The Grinding Economy</h2>
                <p className="text-muted-foreground mb-6">
                  Snarbles operates on a simple principle: <strong>effort equals reward</strong>. Unlike other platforms that give away tokens for free, every seed, every point, and every achievement in Snarbles is earned through strategic gameplay and consistent effort.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Rewards Per Harvest</span>
                      <span>250 Points</span>
                    </div>
                    <ProgressBar 
                      value={250} 
                      max={500}
                      className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36]" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Active Farmers</span>
                      <span>5,283</span>
                    </div>
                    <ProgressBar 
                      value={5283} 
                      max={10000} 
                      variant="success"
                      className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36]"
                    />
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90"
                  onClick={() => navigate('/dashboard')}
                >
                  Join the Economy
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
                          <span className="font-medium">Rare Crop Harvested</span>
                        </div>
                        <span className="text-[#2DB87F]">+500 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-[#2DB87F]" />
                          <span className="font-medium">7-Day Farming Streak</span>
                        </div>
                        <span className="text-[#2DB87F]">+350 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span className="font-medium">Weekly Leaderboard #1</span>
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
          <h2 className="text-3xl font-bold mb-4 font-heading">Ready to Put in the Work?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            In Snarbles, there's no free lunch—only the satisfaction of earning real rewards through strategy and effort. Connect your wallet, start completing tasks, and build your farming empire today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/farm')}
            >
              Start Farming <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-[#2DB87F]/50 hover:border-[#2DB87F] text-lg px-8 py-6 rounded-xl"
              onClick={() => navigate('/tasks')}
            >
              View Tasks <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Homepage;
