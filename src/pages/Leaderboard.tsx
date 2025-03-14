
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Trophy, Medal, Star, ArrowUp, ArrowDown, Minus, Users, Calendar, Award } from "lucide-react";
import { currentUser } from '@/utils/taskData';
import { cn } from '@/lib/utils';

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, rank: 1, username: "FarmKing", walletAddress: "0x8d3...f29e", points: 12500, level: 25, change: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=FarmKing" },
  { id: 2, rank: 2, username: "CropMaster", walletAddress: "0x7c2...d37a", points: 11800, level: 22, change: 1, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CropMaster" },
  { id: 3, rank: 3, username: "HarvestQueen", walletAddress: "0x6b1...8c4d", points: 11200, level: 21, change: -1, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=HarvestQueen" },
  { id: 4, rank: 4, username: "SeedWhisperer", walletAddress: "0x5a0...7b3c", points: 10900, level: 20, change: 2, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SeedWhisperer" },
  { id: 5, rank: 5, username: "GreenThumb", walletAddress: "0x4f9...6a2b", points: 10500, level: 19, change: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=GreenThumb" },
  { id: 6, rank: 6, username: "PlotPlanner", walletAddress: "0x3e8...5f1a", points: 10200, level: 18, change: -2, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PlotPlanner" },
  { id: 7, rank: 7, username: "SoilSage", walletAddress: "0x2d7...4e09", points: 9800, level: 18, change: 1, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SoilSage" },
  { id: 8, rank: 8, username: "CropCrusader", walletAddress: "0x1c6...3d98", points: 9500, level: 17, change: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CropCrusader" },
  { id: 9, rank: 9, username: "FarmingFanatic", walletAddress: "0x0b5...2c87", points: 9200, level: 17, change: -1, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=FarmingFanatic" },
  { id: 10, rank: 10, username: "PlantPioneer", walletAddress: "0xa4...1b76", points: 8900, level: 16, change: 3, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PlantPioneer" },
  // Add current user at position 42
  { id: 11, rank: 42, username: currentUser.username, walletAddress: "0xYourWallet", points: currentUser.totalPoints, level: currentUser.level, change: 5, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=YourUsername" },
];

const RankChangeIndicator = ({ change }: { change: number }) => {
  if (change > 0) {
    return <div className="flex items-center text-green-500"><ArrowUp className="h-4 w-4 mr-1" />{change}</div>;
  } else if (change < 0) {
    return <div className="flex items-center text-red-500"><ArrowDown className="h-4 w-4 mr-1" />{Math.abs(change)}</div>;
  } else {
    return <div className="flex items-center text-muted-foreground"><Minus className="h-4 w-4 mr-1" />0</div>;
  }
};

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const getUserRank = () => {
    return leaderboardData.find(user => user.username === currentUser.username)?.rank || 0;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading">Leaderboard</h1>
            <p className="text-muted-foreground">
              Compete with other farmers and climb the ranks
            </p>
          </div>
        </div>

        {/* Your Rank Card */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-[#2DB87F]/10 to-[#0D6B36]/10 border-[#2DB87F]/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2DB87F]">
                      <img 
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=YourUsername" 
                        alt={currentUser.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#2DB87F] rounded-full p-1">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{currentUser.username}</h2>
                    <p className="text-muted-foreground text-sm">Your current rank: #{getUserRank()}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-[#2DB87F]">{currentUser.totalPoints.toLocaleString()} pts</div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUp className="h-4 w-4 mr-1" />5 ranks this week
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="weekly" 
              onClick={() => setTimeframe('weekly')}
              className="data-[state=active]:bg-[#2DB87F] data-[state=active]:text-white"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="monthly" 
              onClick={() => setTimeframe('monthly')}
              className="data-[state=active]:bg-[#2DB87F] data-[state=active]:text-white"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger 
              value="allTime" 
              onClick={() => setTimeframe('allTime')}
              className="data-[state=active]:bg-[#2DB87F] data-[state=active]:text-white"
            >
              All Time
            </TabsTrigger>
          </TabsList>

          {/* Leaderboard Content - Same for all tabs in this mock */}
          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                    Top Farmers
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    This Week
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rank</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Farmer</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Level</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Points</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.slice(0, 10).map((user) => (
                        <tr key={user.id} className="border-b border-border last:border-0 hover:bg-accent/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {user.rank === 1 && <Trophy className="h-5 w-5 text-amber-500 mr-1" />}
                              {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400 mr-1" />}
                              {user.rank === 3 && <Medal className="h-5 w-5 text-amber-600 mr-1" />}
                              {user.rank > 3 && <span className="w-5 mr-1 text-center">{user.rank}</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium">{user.username}</div>
                                <div className="text-xs text-muted-foreground">{user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-[#2DB87F] mr-1" />
                              {user.level}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {user.points.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <RankChangeIndicator change={user.change} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Current User's Position (if not in top 10) */}
                {getUserRank() > 10 && (
                  <>
                    <div className="text-center py-2 text-muted-foreground">• • •</div>
                    <table className="w-full">
                      <tbody>
                        <tr className="bg-[#2DB87F]/10 border-[#2DB87F]/30 rounded-md">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="w-5 mr-1 text-center">{getUserRank()}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-[#2DB87F]">
                                <img 
                                  src="https://api.dicebear.com/7.x/bottts/svg?seed=YourUsername" 
                                  alt={currentUser.username} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{currentUser.username}</div>
                                <div className="text-xs text-muted-foreground">0xYourWallet</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-[#2DB87F] mr-1" />
                              {currentUser.level}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {currentUser.totalPoints.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center text-green-500 justify-end"><ArrowUp className="h-4 w-4 mr-1" />5</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reward Tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#2DB87F]" />
                  Reward Tiers
                </CardTitle>
                <CardDescription>
                  Rewards for top performers in this week's leaderboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-4 text-center">
                    <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-1">1st Place</h3>
                    <p className="text-muted-foreground text-sm mb-2">Top farmer of the week</p>
                    <div className="space-y-1">
                      <div className="text-sm">5,000 Testnet Points</div>
                      <div className="text-sm">Legendary Equipment NFT</div>
                      <div className="text-sm">5x Farm Plot Expansion</div>
                    </div>
                  </div>
                  <div className="border border-gray-400/30 bg-gray-400/5 rounded-lg p-4 text-center">
                    <Medal className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-1">2nd Place</h3>
                    <p className="text-muted-foreground text-sm mb-2">Runner-up farmer</p>
                    <div className="space-y-1">
                      <div className="text-sm">3,000 Testnet Points</div>
                      <div className="text-sm">Rare Equipment NFT</div>
                      <div className="text-sm">3x Farm Plot Expansion</div>
                    </div>
                  </div>
                  <div className="border border-amber-600/30 bg-amber-600/5 rounded-lg p-4 text-center">
                    <Medal className="h-10 w-10 text-amber-600 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-1">3rd Place</h3>
                    <p className="text-muted-foreground text-sm mb-2">Bronze tier farmer</p>
                    <div className="space-y-1">
                      <div className="text-sm">1,500 Testnet Points</div>
                      <div className="text-sm">Uncommon Equipment NFT</div>
                      <div className="text-sm">2x Farm Plot Expansion</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Top 4-10 positions also receive rewards!</p>
                  <Button variant="outline">View Full Reward Structure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Use the same content for all tabs in this mock */}
          <TabsContent value="monthly" className="space-y-6">
            {/* Same content as weekly tab */}
            <div className="text-center p-8 text-muted-foreground">
              Monthly leaderboard would show the same structure with different data
            </div>
          </TabsContent>

          <TabsContent value="allTime" className="space-y-6">
            {/* Same content as weekly tab */}
            <div className="text-center p-8 text-muted-foreground">
              All-time leaderboard would show the same structure with different data
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Stats */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 font-heading flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Community Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">15,427</div>
                  <p className="text-sm text-muted-foreground">Total Farmers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">2.3M</div>
                  <p className="text-sm text-muted-foreground">Crops Harvested</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">457K</div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">98.2M</div>
                  <p className="text-sm text-muted-foreground">Points Earned</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Leaderboard;
