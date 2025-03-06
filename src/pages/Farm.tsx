
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import FarmGrid from '@/components/farm/FarmGrid';
import { FarmCell } from '@/utils/types';
import ResourceManager from '@/components/farm/ResourceManager';
import FarmStats from '@/components/farm/FarmStats';
import StreakCounter from '@/components/farm/StreakCounter';
import { Leaf, Droplet, Sun, Tractor } from 'lucide-react';

const Farm = () => {
  // Initialize farm grid
  const [farmGrid, setFarmGrid] = useState<FarmCell[][]>(() => {
    const savedGrid = localStorage.getItem('farmGrid');
    if (savedGrid) {
      try {
        return JSON.parse(savedGrid);
      } catch (e) {
        console.error('Failed to parse saved farm grid:', e);
      }
    }
    
    // Default grid if no saved data
    return Array(5).fill(0).map((_, rowIndex) => 
      Array(5).fill(0).map((_, colIndex) => ({
        id: `cell-${rowIndex}-${colIndex}`,
        status: 'empty',
        plantedAt: null,
        harvestedAt: null
      }))
    );
  });

  // Initialize resources
  const [resources, setResources] = useState(() => {
    const savedResources = localStorage.getItem('farmResources');
    if (savedResources) {
      try {
        return JSON.parse(savedResources);
      } catch (e) {
        console.error('Failed to parse saved resources:', e);
      }
    }
    
    // Default resources
    return [
      { name: 'Seeds', quantity: 10, icon: <Leaf className="h-5 w-5" /> },
      { name: 'Water', quantity: 15, icon: <Droplet className="h-5 w-5" /> },
      { name: 'Fertilizer', quantity: 5, icon: <Sun className="h-5 w-5" /> },
      { name: 'Tools', quantity: 8, icon: <Tractor className="h-5 w-5" /> }
    ];
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('farmGrid', JSON.stringify(farmGrid));
    localStorage.setItem('farmResources', JSON.stringify(resources));
  }, [farmGrid, resources]);

  // Handle cell update
  const handleCellUpdate = (rowIndex: number, colIndex: number, newStatus: FarmCell['status']) => {
    const newGrid = [...farmGrid];
    const now = new Date().toISOString();
    
    // Update cell status and timestamps
    newGrid[rowIndex][colIndex] = {
      ...newGrid[rowIndex][colIndex],
      status: newStatus,
      ...(newStatus === 'planted' && { plantedAt: now }),
      ...(newStatus === 'harvested' && { harvestedAt: now })
    };
    
    // Update resource quantities based on action
    const newResources = [...resources];
    const resourceUpdates = {
      'empty': { name: 'Tools', change: -1 },
      'planted': { name: 'Seeds', change: -1 },
      'growing': { name: 'Water', change: -1 },
      'ready': { name: '', change: 0 },
      'harvested': { name: '', change: 0 }
    };
    
    const { name, change } = resourceUpdates[newStatus];
    if (name && change) {
      const resourceIndex = newResources.findIndex(r => r.name === name);
      if (resourceIndex >= 0) {
        newResources[resourceIndex] = {
          ...newResources[resourceIndex],
          quantity: Math.max(0, newResources[resourceIndex].quantity + change)
        };
      }
    }
    
    // If harvested, add to relevant resources
    if (newStatus === 'harvested') {
      const fertilizerIndex = newResources.findIndex(r => r.name === 'Fertilizer');
      if (fertilizerIndex >= 0) {
        newResources[fertilizerIndex] = {
          ...newResources[fertilizerIndex],
          quantity: newResources[fertilizerIndex].quantity + 1
        };
      }
    }
    
    setFarmGrid(newGrid);
    setResources(newResources);
  };

  // Handle resource update
  const handleResourceUpdate = (name: string, change: number) => {
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.name === name 
          ? { ...resource, quantity: Math.max(0, resource.quantity + change) } 
          : resource
      )
    );
  };

  // Calculate farm stats
  const farmStats = {
    planted: farmGrid.flat().filter(cell => cell.status === 'planted').length,
    growing: farmGrid.flat().filter(cell => cell.status === 'growing').length,
    ready: farmGrid.flat().filter(cell => cell.status === 'ready').length,
    harvested: farmGrid.flat().filter(cell => cell.status === 'harvested').length,
    total: farmGrid.flat().length
  };

  return (
    <div className="min-h-screen farm-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6 font-heading">Your Farm</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farm Grid */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Farm Management</CardTitle>
              <CardDescription>
                Click on plots to plant, water, and harvest your crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="grid">Farm Grid</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grid" className="space-y-6">
                  <FarmGrid 
                    grid={farmGrid} 
                    onCellUpdate={handleCellUpdate} 
                    resources={resources}
                  />
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-6">
                  <ResourceManager 
                    resources={resources} 
                    onUpdate={handleResourceUpdate} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Stats Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Statistics</CardTitle>
                <CardDescription>
                  Track your farming progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FarmStats stats={farmStats} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Consistency</CardTitle>
                <CardDescription>
                  Your farming streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StreakCounter />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Farm;
