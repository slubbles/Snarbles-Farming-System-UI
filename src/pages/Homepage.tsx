
import { useNavigate } from 'react-router-dom';
import { Tractor, BarChart3, Trophy, ArrowRight, Sparkles, Leaf, Calendar, Wallet, Zap, Users } from 'lucide-react';
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
      icon: <Tractor className="h-10 w-10 text-[#3EC7AA]" />,
      title: "Strategic Farm Management",
      description: "Plant, water, and harvest your digital crops. Every decision matters in your journey to becoming a master farmer.",
      action: () => navigate('/farm')
    },
    {
      icon: <Zap className="h-10 w-10 text-[#3EC7AA]" />,
      title: "Earn Real Rewards",
      description: "Complete tasks to earn seeds and Testnet Points. No free handouts—every reward is earned through your dedication and strategy.",
      action: () => navigate('/tasks')
    },
    {
      icon: <Trophy className="h-10 w-10 text-[#3EC7AA]" />,
      title: "Competitive Leaderboards",
      description: "Climb the ranks and showcase your farming prowess. Compete against other farmers and earn recognition for your skills.",
      action: () => navigate('/leaderboard')
    },
    {
      icon: <Users className="h-10 w-10 text-[#3EC7AA]" />,
      title: "Join Farming Guilds",
      description: "Connect with other farmers, form guilds, and amplify your rewards through collaboration and friendly competition.",
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <Layout>
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
            In a World of Free Money, <span className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] bg-clip-text text-transparent">We Choose to Grind</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Snarbles emerged from the chaos of airdrop season—a battleground where true farmers can separate themselves from those seeking handouts. Here, every seed, every harvest, and every point is earned through strategy and effort.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-6 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/farm')}
            >
              Start Your Farm <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <WalletConnect />
          </div>
        </section>

        {/* Origin Story */}
        <section className="mb-16 max-w-4xl mx-auto animate-fade-in">
          <div className="glass-panel p-8 md:p-12 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 font-heading text-center">The Snarbles Origin</h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="leading-relaxed mb-4">
                In the early days of 2023, as airdrops rained down on those who simply held tokens without contribution, a small team of builders grew frustrated with the shallow incentives of the Web3 space.
              </p>
              <p className="leading-relaxed mb-4">
                "What if," they wondered, "we built a world where every reward had to be earned—where effort and strategy determined success, not just being in the right place at the right time?"
              </p>
              <p className="leading-relaxed mb-4">
                From this question, Snarbles was born—a digital farming ecosystem where seeds must be planted, nurtured, and harvested. Where points are earned through daily tasks, strategic decisions, and community engagement. Where building meaningful connections with other farmers strengthens your yield.
              </p>
              <p className="leading-relaxed font-semibold">
                In Snarbles, there are no shortcuts. Only the satisfaction of watching your farm grow through your own dedication.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 font-heading text-center">How Snarbles Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#3EC7AA]/10 p-4 mb-4">
                    <Calendar className="h-8 w-8 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Complete Tasks</h3>
                  <p className="text-muted-foreground">
                    Earn seeds by completing Zealy-style tasks. Each task completed gives you resources to grow your farm.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#3EC7AA]/10 p-4 mb-4">
                    <Leaf className="h-8 w-8 text-[#3EC7AA]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. Farm Strategically</h3>
                  <p className="text-muted-foreground">
                    Plant your seeds, water them daily, and watch them grow over 1-3 days. Your strategy determines your success.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 interactive-element">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#3EC7AA]/10 p-4 mb-4">
                    <Sparkles className="h-8 w-8 text-[#3EC7AA]" />
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
        <section className="py-8 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 font-heading text-center">Why Snarbles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-[#3EC7AA]/20 hover:border-[#3EC7AA]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={feature.action}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="p-4 rounded-xl bg-[#3EC7AA]/10">
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
                        className="text-[#3EC7AA] hover:text-[#3EC7AA] hover:bg-[#3EC7AA]/10"
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
        <section className="py-8 mb-16 animate-fade-in">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 font-heading">The Grinding Economy</h2>
                <p className="text-muted-foreground mb-6">
                  Unlike other platforms that scatter tokens like confetti, Snarbles operates on a simple principle: <strong>effort equals reward</strong>. Our economy is designed to reward those who strategize, persist, and contribute real value to the ecosystem.
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
                      className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36]" 
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
                      className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36]"
                    />
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90"
                  onClick={() => navigate('/dashboard')}
                >
                  Join the Economy
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -top-6 -right-6 rounded-full bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] p-4 animate-pulse">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-[#3EC7AA]/20 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Tractor className="h-5 w-5 text-[#3EC7AA]" />
                          <span className="font-medium">Rare Crop Harvested</span>
                        </div>
                        <span className="text-[#3EC7AA]">+500 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-[#3EC7AA]" />
                          <span className="font-medium">7-Day Farming Streak</span>
                        </div>
                        <span className="text-[#3EC7AA]">+350 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-border">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span className="font-medium">Weekly Leaderboard #1</span>
                        </div>
                        <span className="text-[#3EC7AA]">+1000 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-8 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 font-heading">Will You Answer the Call?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            In a digital landscape filled with empty promises and inflated tokens, Snarbles stands as a testament to the value of real work and strategic thinking. Connect your wallet, start completing tasks, and build your farming empire—one hard-earned seed at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate('/farm')}
            >
              Start Farming <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-[#3EC7AA]/50 hover:border-[#3EC7AA] text-lg px-8 py-6 rounded-xl"
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
