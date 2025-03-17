
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Gift, Award, TrendingUp, Zap, Calendar, Lock, CheckCircle2 } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { toast } from "@/components/ui/use-toast";
import { useNotificationContext } from "@/components/ui/notifications";
import WalletConnect from "@/components/wallet/WalletConnect";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("airdrops");
  const { addNotification } = useNotificationContext();
  const [walletConnected, setWalletConnected] = useState(false);
  
  // Mock data for airdrops
  const airdrops = [
    {
      id: 1,
      name: "Genesis Farmer NFT",
      progress: 60,
      requirementMet: true,
      requirements: "Reach Level 10 & Own 5 Rare Crops",
      description: "Early adopter NFT with exclusive benefits for the mainnet launch."
    },
    {
      id: 2,
      name: "Seasonal Token Boost",
      progress: 35,
      requirementMet: false,
      requirements: "Survive 3 full seasons & Harvest 50 crops",
      description: "Token boost multiplier for the first month of mainnet launch."
    },
    {
      id: 3,
      name: "Farm Plot Land Deed",
      progress: 85,
      requirementMet: true,
      requirements: "Reach Level 15 & Complete 20 Tasks",
      description: "Special land deed granting prime location in mainnet launch."
    }
  ];
  
  // Mock data for conversion milestones
  const conversionMilestones = [
    {
      id: 1,
      level: "Bronze",
      pointsRequired: 5000,
      currentPoints: 3250,
      rewards: "100 $SNRB Tokens, 1 Bronze Seed Pack"
    },
    {
      id: 2,
      level: "Silver",
      pointsRequired: 15000,
      currentPoints: 3250,
      rewards: "350 $SNRB Tokens, 1 Silver Seed Pack, 1 Limited Tool NFT"
    },
    {
      id: 3,
      level: "Gold",
      pointsRequired: 30000,
      currentPoints: 3250,
      rewards: "1000 $SNRB Tokens, 1 Gold Seed Pack, 2 Limited Tool NFTs, 1 Farm Plot Expansion"
    },
    {
      id: 4,
      level: "Platinum",
      pointsRequired: 50000,
      currentPoints: 3250,
      rewards: "2500 $SNRB Tokens, 1 Legendary Seed, 5 Limited Tool NFTs, 3 Farm Plot Expansions"
    }
  ];
  
  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      name: "First Harvest",
      description: "Harvest your first crop",
      completed: true,
      points: 50,
      icon: "🌾"
    },
    {
      id: 2,
      name: "Market Maker",
      description: "Complete 5 trades in the marketplace",
      completed: true,
      points: 100,
      icon: "🛒"
    },
    {
      id: 3,
      name: "Season Survivor",
      description: "Successfully maintain your farm through all four seasons",
      completed: false,
      progress: 75,
      points: 250,
      icon: "🌦️"
    },
    {
      id: 4,
      name: "Risk Taker",
      description: "Complete a high-risk black market deal successfully",
      completed: false,
      progress: 0,
      points: 200,
      icon: "🎭"
    },
    {
      id: 5,
      name: "Master Farmer",
      description: "Reach Level 20 and unlock all farm plots",
      completed: false,
      progress: 45,
      points: 500,
      icon: "🏆"
    }
  ];
  
  const handleClaimAirdrop = (airdropId: number, airdropName: string) => {
    toast({
      title: "Airdrop Registration",
      description: `Processing registration for ${airdropName}...`,
    });
    
    setTimeout(() => {
      addNotification({
        title: "Airdrop Registered",
        message: `You've successfully registered for the ${airdropName} airdrop!`,
        type: "success"
      });
    }, 2000);
  };
  
  const handleClaimAchievement = (achievementId: number, achievementName: string) => {
    toast({
      title: "Achievement Reward",
      description: `Claiming rewards for ${achievementName}...`,
    });
    
    setTimeout(() => {
      addNotification({
        title: "Rewards Claimed",
        message: `You've received the rewards for completing ${achievementName}!`,
        type: "success"
      });
    }, 2000);
  };
  
  const handleWalletUpdate = (address: string | undefined) => {
    setWalletConnected(!!address);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Gift className="mr-2 h-6 w-6 text-purple-400" />
              Rewards & Airdrops
            </h1>
            <p className="text-muted-foreground">Your testnet progress and mainnet conversion rewards</p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletConnect onConnect={(address) => handleWalletUpdate(address)} onDisconnect={() => handleWalletUpdate(undefined)} />
          </div>
        </div>
        
        {!walletConnected && (
          <Card className="mb-6 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-500 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Wallet Connection Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connect your wallet to register for airdrops and claim rewards.</p>
            </CardContent>
          </Card>
        )}
        
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Testnet Points Progress</CardTitle>
              <CardDescription>Your progress toward mainnet conversion milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Testnet Points</span>
                  <span className="font-bold text-primary">3,250 / 50,000</span>
                </div>
                <ProgressBar 
                  value={3250} 
                  max={50000} 
                  variant="default"
                  size="lg"
                  animated={true}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {conversionMilestones.map((milestone) => (
                  <div key={milestone.id} className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 ${
                      milestone.currentPoints >= milestone.pointsRequired 
                        ? 'border-green-500 bg-green-500/20' 
                        : 'border-gray-500 bg-gray-500/10'
                    }`}>
                      <span className="text-2xl font-bold">
                        {milestone.currentPoints >= milestone.pointsRequired ? (
                          <CheckCircle2 className="h-8 w-8 text-green-500" />
                        ) : (
                          milestone.level.charAt(0)
                        )}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">{milestone.level}</p>
                      <p className="text-xs text-muted-foreground">
                        {milestone.pointsRequired.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="airdrops" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" /> Airdrops
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center">
              <Award className="mr-2 h-4 w-4" /> Achievements
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" /> Conversion Plan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="airdrops" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airdrops.map(airdrop => (
                <Card key={airdrop.id} className={`border ${airdrop.requirementMet ? 'border-purple-500/30' : 'border-gray-800'}`}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{airdrop.name}</CardTitle>
                      {airdrop.requirementMet ? (
                        <Badge className="bg-purple-500">Eligible</Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                    <CardDescription>{airdrop.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Requirements</span>
                          <span>{airdrop.progress}%</span>
                        </div>
                        <ProgressBar 
                          value={airdrop.progress} 
                          max={100} 
                          variant={airdrop.requirementMet ? 'success' : 'default'}
                          size="md"
                        />
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Requirements:</span>
                        <p className="mt-1">{airdrop.requirements}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={airdrop.requirementMet ? "w-full bg-gradient-to-r from-purple-500 to-indigo-500" : "w-full"}
                      disabled={!airdrop.requirementMet || !walletConnected}
                      onClick={() => handleClaimAirdrop(airdrop.id, airdrop.name)}
                    >
                      {airdrop.requirementMet ? "Register for Airdrop" : "Complete Requirements"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id} className={`${achievement.completed ? 'border-green-500/30' : 'border-gray-800'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="flex items-center">
                        <span className="text-2xl mr-2">{achievement.icon}</span>
                        {achievement.name}
                      </CardTitle>
                      <Badge className={achievement.completed ? 'bg-green-500' : 'bg-secondary'}>
                        {achievement.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!achievement.completed && achievement.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <ProgressBar 
                          value={achievement.progress} 
                          max={100} 
                          size="sm"
                        />
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reward:</span>
                      <span className="ml-2 font-medium text-yellow-500">{achievement.points} Testnet Points</span>
                    </div>
                  </CardContent>
                  {achievement.completed && (
                    <CardFooter>
                      <Button 
                        variant="outline"
                        className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
                        onClick={() => handleClaimAchievement(achievement.id, achievement.name)}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Claim Rewards
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mainnet Conversion Plan</CardTitle>
                <CardDescription>How your testnet points will convert to mainnet rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="md:w-1/2 space-y-4">
                      <h3 className="text-lg font-semibold">Conversion Tiers</h3>
                      {conversionMilestones.map((milestone) => (
                        <div key={milestone.id} className="border border-border rounded-md p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold">{milestone.level} Tier</h4>
                            <Badge className={milestone.currentPoints >= milestone.pointsRequired ? 'bg-green-500' : 'bg-secondary'}>
                              {milestone.pointsRequired.toLocaleString()} pts
                            </Badge>
                          </div>
                          <ProgressBar 
                            value={milestone.currentPoints} 
                            max={milestone.pointsRequired} 
                            variant={milestone.currentPoints >= milestone.pointsRequired ? 'success' : 'default'}
                            size="sm"
                          />
                          <p className="mt-2 text-sm text-muted-foreground">Rewards:</p>
                          <p className="text-sm">{milestone.rewards}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="md:w-1/2 space-y-4">
                      <h3 className="text-lg font-semibold">Mainnet Launch Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/80 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h4 className="font-medium">Phase 1: Testnet</h4>
                            <p className="text-sm text-muted-foreground">Earn testnet points and qualify for airdrops</p>
                            <div className="flex items-center mt-1 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span className="text-green-400">Active Now</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="border border-primary/80 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-xs font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Phase 2: Snapshot</h4>
                            <p className="text-sm text-muted-foreground">Final testnet points are recorded for conversion</p>
                            <div className="flex items-center mt-1 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Q3 2023</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="border border-primary/80 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-xs font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Phase 3: Airdrop Distribution</h4>
                            <p className="text-sm text-muted-foreground">NFTs and tokens distributed to qualified users</p>
                            <div className="flex items-center mt-1 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Q4 2023</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="border border-primary/80 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-xs font-medium">4</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Phase 4: Mainnet Launch</h4>
                            <p className="text-sm text-muted-foreground">Full platform launch with all features enabled</p>
                            <div className="flex items-center mt-1 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Q1 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Rewards;
