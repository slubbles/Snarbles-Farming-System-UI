
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Award, Medal, Shield, Zap, CircleDollarSign, Save, RotateCcw, Wallet, Lock } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import ProgressBar from '@/components/ui/ProgressBar';
import { currentUser } from '@/utils/taskData';
import WalletConnect from '@/components/wallet/WalletConnect';

const upgradeOptions = [
  {
    id: 'plot_expansion',
    title: 'Farm Plot Expansion',
    description: 'Increase your farm size from 5x5 to 7x7',
    cost: 5000,
    currentLevel: 0,
    maxLevel: 3,
    icon: <Zap className="h-8 w-8 text-primary" />
  },
  {
    id: 'auto_water',
    title: 'Automatic Watering',
    description: 'Water your crops automatically once every 12 hours',
    cost: 3500,
    currentLevel: 0,
    maxLevel: 1,
    icon: <Shield className="h-8 w-8 text-primary" />
  },
  {
    id: 'resource_boost',
    title: 'Resource Production',
    description: 'Gain 20% more resources from all activities',
    cost: 2500,
    currentLevel: 1,
    maxLevel: 5,
    icon: <CircleDollarSign className="h-8 w-8 text-primary" />
  }
];

const achievements = [
  {
    id: 'first_harvest',
    title: 'First Harvest',
    description: 'Harvest your first crop',
    completed: true,
    icon: <Award className="h-6 w-6 text-amber-500" />
  },
  {
    id: 'resource_collector',
    title: 'Resource Collector',
    description: 'Collect 100 total resources',
    progress: 76,
    total: 100,
    completed: false,
    icon: <Award className="h-6 w-6 text-primary" />
  },
  {
    id: 'master_farmer',
    title: 'Master Farmer',
    description: 'Reach level 10',
    progress: 4,
    total: 10,
    completed: false,
    icon: <Medal className="h-6 w-6 text-amber-500" />
  },
  {
    id: 'week_streak',
    title: 'Streak Master',
    description: 'Maintain a 7-day farming streak',
    progress: 5,
    total: 7,
    completed: false,
    icon: <Award className="h-6 w-6 text-indigo-500" />
  },
  {
    id: 'full_field',
    title: 'Full Field',
    description: 'Have all plots growing crops simultaneously',
    completed: true,
    icon: <Award className="h-6 w-6 text-green-500" />
  }
];

const Profile = () => {
  const [user, setUser] = useState({
    username: currentUser.username,
    walletAddress: "0x8f3...a29e",
    level: currentUser.level,
    points: currentUser.totalPoints,
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=YourUsername",
  });
  
  const [editMode, setEditMode] = useState(false);
  const [userUpgrades, setUserUpgrades] = useState(upgradeOptions);
  const [formValues, setFormValues] = useState(user);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  useEffect(() => {
    // Check if wallet is connected
    const connected = localStorage.getItem('walletConnected') === 'true';
    const address = localStorage.getItem('walletAddress');
    
    if (connected && address) {
      setIsWalletConnected(true);
      setUser(prev => ({
        ...prev,
        walletAddress: address.substring(0, 6) + '...' + address.substring(address.length - 4)
      }));
    }
  }, []);
  
  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setUser(prev => ({
      ...prev,
      walletAddress: address.substring(0, 6) + '...' + address.substring(address.length - 4)
    }));
  };
  
  const handleSaveProfile = () => {
    setUser(formValues);
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handlePurchaseUpgrade = (upgradeId: string) => {
    const upgrade = userUpgrades.find(u => u.id === upgradeId);
    
    if (!upgrade) return;
    
    if (upgrade.currentLevel >= upgrade.maxLevel) {
      toast({
        title: "Maximum Level Reached",
        description: "You've already reached the maximum level for this upgrade.",
        variant: "destructive"
      });
      return;
    }
    
    if (user.points < upgrade.cost) {
      toast({
        title: "Insufficient Points",
        description: `You need ${upgrade.cost - user.points} more points to purchase this upgrade.`,
        variant: "destructive"
      });
      return;
    }
    
    // Update user points
    setUser(prev => ({
      ...prev,
      points: prev.points - upgrade.cost
    }));
    
    // Update upgrade level
    setUserUpgrades(prev => 
      prev.map(u => 
        u.id === upgradeId 
          ? { ...u, currentLevel: u.currentLevel + 1 }
          : u
      )
    );
    
    toast({
      title: "Upgrade Purchased",
      description: `You have successfully purchased ${upgrade.title}.`,
    });
  };
  
  const handleResetProgress = () => {
    // Show confirmation toast with custom actions
    toast({
      title: "Reset Progress",
      description: "Are you sure you want to reset all your farming progress? This cannot be undone.",
      action: (
        <Button 
          variant="destructive" 
          onClick={() => {
            // Clear localStorage
            localStorage.removeItem('farmGrid');
            localStorage.removeItem('farmResources');
            localStorage.removeItem('streakData');
            
            // Reset upgrades
            setUserUpgrades(upgradeOptions);
            
            toast({
              title: "Progress Reset",
              description: "All your farming progress has been reset.",
            });
          }}
        >
          Reset
        </Button>
      ),
    });
  };
  
  if (!isWalletConnected) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="h-[70vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="mb-6 p-5 rounded-full bg-[#2DB87F]/10">
              <Lock className="h-12 w-12 text-[#2DB87F]" />
            </div>
            <h1 className="text-3xl font-bold mb-4 font-heading">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-8">
              You need to connect your wallet to access your Snarbles profile. Connect now to view your achievements, upgrade your farm, and track your progress.
            </p>
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6 font-heading">Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Profile</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setEditMode(!editMode)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user.username}</h3>
                  <div className="flex items-center justify-center mt-2 mb-4 text-sm bg-secondary/50 py-1 px-3 rounded-full">
                    <Wallet className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    {user.walletAddress}
                  </div>
                  
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Medal className="h-4 w-4 text-primary" />
                    <span className="font-medium">Level {user.level}</span>
                  </div>
                  
                  <div className="flex justify-center items-center space-x-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">{user.points.toLocaleString()} points</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Level Progress</span>
                  <span>{user.points % 1000} / 1000</span>
                </div>
                <ProgressBar value={user.points % 1000} max={1000} />
                <p className="text-xs text-muted-foreground text-center">
                  {1000 - (user.points % 1000)} points until Level {user.level + 1}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleResetProgress}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Progress
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upgrades" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upgrades">Farm Upgrades</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upgrades" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Upgrades</CardTitle>
                    <CardDescription>
                      Use your points to purchase upgrades for your farm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userUpgrades.map((upgrade) => (
                        <div 
                          key={upgrade.id} 
                          className="border border-border rounded-lg p-4 transition-all duration-200 hover:border-primary/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-card rounded-lg">
                              {upgrade.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-semibold">{upgrade.title}</h3>
                                <div className="text-sm font-medium">
                                  Level {upgrade.currentLevel}/{upgrade.maxLevel}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {upgrade.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="text-sm font-medium text-primary">
                                  {upgrade.cost.toLocaleString()} points
                                </div>
                                <Button 
                                  size="sm" 
                                  disabled={upgrade.currentLevel >= upgrade.maxLevel || user.points < upgrade.cost}
                                  onClick={() => handlePurchaseUpgrade(upgrade.id)}
                                >
                                  {upgrade.currentLevel >= upgrade.maxLevel ? 'Maxed Out' : 'Purchase'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Track your farming accomplishments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className={`border border-border rounded-lg p-4 transition-all duration-200 ${
                            achievement.completed ? 'bg-primary/5 border-primary/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-primary/10' : 'bg-card'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-semibold">{achievement.title}</h3>
                                {achievement.completed && (
                                  <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                                    Completed
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              {!achievement.completed && achievement.progress !== undefined && (
                                <div className="space-y-1">
                                  <ProgressBar 
                                    value={achievement.progress} 
                                    max={achievement.total} 
                                    showText={true}
                                    variant={achievement.progress > achievement.total / 2 ? 'success' : 'default'}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
