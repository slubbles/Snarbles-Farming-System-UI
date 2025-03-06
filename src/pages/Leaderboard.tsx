
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Calendar, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

// Mock leaderboard data
const mockLeaderboardData = [
  { id: 1, username: "FarmMaster", points: 12560, level: 28, streak: 45, avatar: "/placeholder.svg" },
  { id: 2, username: "CropKing", points: 10890, level: 25, streak: 32, avatar: "/placeholder.svg" },
  { id: 3, username: "GreenThumb", points: 9750, level: 23, streak: 29, avatar: "/placeholder.svg" },
  { id: 4, username: "HarvestQueen", points: 8900, level: 22, streak: 21, avatar: "/placeholder.svg" },
  { id: 5, username: "SeedSower", points: 7650, level: 19, streak: 18, avatar: "/placeholder.svg" },
  { id: 6, username: "PlantWhisperer", points: 6540, level: 17, streak: 14, avatar: "/placeholder.svg" },
  { id: 7, username: "FieldHand", points: 5890, level: 15, streak: 12, avatar: "/placeholder.svg" },
  { id: 8, username: "CropCrusader", points: 4780, level: 13, streak: 10, avatar: "/placeholder.svg" },
  { id: 9, username: "SoilStrategist", points: 3600, level: 10, streak: 7, avatar: "/placeholder.svg" },
  { id: 10, username: "SproutSpotter", points: 2500, level: 8, streak: 5, avatar: "/placeholder.svg" },
];

// Mock weekly leaders
const mockWeeklyLeaders = [
  { id: 3, username: "GreenThumb", points: 1250, avatar: "/placeholder.svg" },
  { id: 7, username: "FieldHand", points: 980, avatar: "/placeholder.svg" },
  { id: 2, username: "CropKing", points: 870, avatar: "/placeholder.svg" },
];

// Mock monthly leaders
const mockMonthlyLeaders = [
  { id: 1, username: "FarmMaster", points: 4320, avatar: "/placeholder.svg" },
  { id: 2, username: "CropKing", points: 3890, avatar: "/placeholder.svg" },
  { id: 4, username: "HarvestQueen", points: 2780, avatar: "/placeholder.svg" },
];

const LeaderboardTable = ({ data, timeframe }: { data: typeof mockLeaderboardData, timeframe: string }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Rank</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Farmer</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Points</th>
              {timeframe === 'all-time' && (
                <>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Level</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Streak</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr 
                key={user.id}
                className={cn(
                  "border-b border-border/30 transition-colors hover:bg-card/60",
                  index < 3 && "bg-card/40"
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                    ) : index === 1 ? (
                      <Medal className="h-5 w-5 text-gray-300 mr-1" />
                    ) : index === 2 ? (
                      <Medal className="h-5 w-5 text-amber-700 mr-1" />
                    ) : (
                      <span className="font-mono w-5 text-center mr-1">{index + 1}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback className="bg-primary/20 text-primary-foreground">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {user.points.toLocaleString()}
                </td>
                {timeframe === 'all-time' && (
                  <>
                    <td className="px-4 py-3 text-right font-medium">
                      {user.level}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Calendar className="h-4 w-4 text-primary/70" />
                        <span>{user.streak}</span>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);
  const [weeklyLeaders, setWeeklyLeaders] = useState(mockWeeklyLeaders);
  const [monthlyLeaders, setMonthlyLeaders] = useState(mockMonthlyLeaders);
  
  return (
    <div className="min-h-screen farm-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6 font-heading">Leaderboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="interactive-element">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Weekly Leaders</CardTitle>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              {weeklyLeaders.map((leader, index) => (
                <div key={leader.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/20 text-primary font-semibold text-xs">
                      {index + 1}
                    </div>
                    <span className="font-medium">{leader.username}</span>
                  </div>
                  <span className="text-muted-foreground">{leader.points.toLocaleString()} pts</span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="interactive-element">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Monthly Leaders</CardTitle>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              {monthlyLeaders.map((leader, index) => (
                <div key={leader.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/20 text-primary font-semibold text-xs">
                      {index + 1}
                    </div>
                    <span className="font-medium">{leader.username}</span>
                  </div>
                  <span className="text-muted-foreground">{leader.points.toLocaleString()} pts</span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="interactive-element">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Your Position</CardTitle>
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Rank</span>
                  <span className="font-semibold text-lg">#4</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Distance to #3</span>
                    <span>850 points</span>
                  </div>
                  <ProgressBar value={8050} max={9750} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Your Score: 8,900</span>
                  <span>Next Rank: 9,750</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Farmers Ranking</CardTitle>
            <CardDescription>
              See how you stack up against other farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all-time" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-time">
                <LeaderboardTable data={leaderboardData} timeframe="all-time" />
              </TabsContent>
              
              <TabsContent value="weekly">
                <LeaderboardTable 
                  data={weeklyLeaders.map((user, index) => ({
                    ...user,
                    level: Math.floor(user.points / 500) + 1,
                    streak: Math.floor(Math.random() * 7) + 1
                  }))} 
                  timeframe="weekly" 
                />
              </TabsContent>
              
              <TabsContent value="monthly">
                <LeaderboardTable 
                  data={monthlyLeaders.map((user, index) => ({
                    ...user,
                    level: Math.floor(user.points / 500) + 1,
                    streak: Math.floor(Math.random() * 30) + 1
                  }))} 
                  timeframe="monthly" 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
