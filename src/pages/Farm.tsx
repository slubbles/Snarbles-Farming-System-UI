
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FarmGrid } from "@/components/farm/FarmGrid";
import { ResourceManager } from "@/components/farm/ResourceManager";
import { FarmStats as FarmStatsComponent } from "@/components/farm/FarmStats";
import { StreakCounter } from "@/components/farm/StreakCounter";
import { DataControls } from "@/components/farm/DataControls";
import { currentUser } from '@/utils/taskData';
import { Resource, FarmStats } from '@/utils/types';
import { Sparkles, Sprout, Plant, BarChart3 } from "lucide-react";

const Farm = () => {
  const [resources, setResources] = useState<Resource[]>(currentUser.resources);
  const [activeTab, setActiveTab] = useState("manage");
  const [userStreak, setUserStreak] = useState(currentUser.streak);
  
  // Sample farm stats data
  const mockFarmStats: FarmStats[] = [
    { date: '2023-05-01', progress: 25, pointsEarned: 120 },
    { date: '2023-05-02', progress: 30, pointsEarned: 150 },
    { date: '2023-05-03', progress: 45, pointsEarned: 200 },
    { date: '2023-05-04', progress: 60, pointsEarned: 250 },
    { date: '2023-05-05', progress: 75, pointsEarned: 300 },
    { date: '2023-05-06', progress: 80, pointsEarned: 320 },
    { date: '2023-05-07', progress: 90, pointsEarned: 350 },
  ];
  
  const [farmStatsData, setFarmStatsData] = useState<FarmStats[]>(mockFarmStats);
  
  // Farm stats summary
  const farmSummary = {
    planted: 12,
    growing: 8,
    ready: 3,
    harvested: 5,
    total: 28
  };

  const handleResourceUpdate = (name: string, change: number) => {
    const updatedResources = resources.map(resource => {
      if (resource.name === name) {
        return { ...resource, quantity: Math.max(0, resource.quantity + change) };
      }
      return resource;
    });
    setResources(updatedResources);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Farm Management</h1>
            <p className="text-muted-foreground">Grow your virtual crops and earn points</p>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="manage" className="flex items-center">
              <Plant className="mr-2 h-4 w-4" /> Manage Farm
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" /> Farm Stats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Farm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FarmGrid />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="mr-2">
                      <Sprout className="mr-2 h-4 w-4" /> Plant Seeds
                    </Button>
                    <Button variant="outline" className="mr-2">
                      <Sparkles className="mr-2 h-4 w-4" /> Harvest Crops
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResourceManager resources={resources} onUpdate={handleResourceUpdate} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Farming Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StreakCounter streak={userStreak} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <FarmStatsComponent stats={farmStatsData} />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataControls summary={farmSummary} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Farm;
