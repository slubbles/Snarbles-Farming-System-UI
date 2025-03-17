
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Skull, Bug, Seedling, ShoppingBag, Flame, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNotificationContext } from "@/components/ui/notifications";
import ProgressBar from "@/components/ui/ProgressBar";
import WalletConnect from "@/components/wallet/WalletConnect";

const BlackMarket = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const [riskLevel, setRiskLevel] = useState(50);
  const { addNotification } = useNotificationContext();
  
  // Mock data for black market deals
  const mysteryDeals = [
    { id: 1, name: "Mystery Crop Bundle", price: 150, risk: "Medium", description: "A bundle of various crops. Could be valuable, could be worthless." },
    { id: 2, name: "Dark Seeds", price: 300, risk: "High", description: "Seeds of unknown origin with unusual properties. High risk, high reward." },
    { id: 3, name: "Abandoned Farm Plot", price: 500, risk: "Very High", description: "Previous owner disappeared. Could have valuable resources or... something else." },
  ];
  
  // Mock data for sabotage options
  const sabotageOptions = [
    { id: 1, name: "Crop Insects", price: 100, success: 70, description: "Release insects to damage another farmer's crops, reducing their yield." },
    { id: 2, name: "Weed Spreader", price: 200, success: 60, description: "Spread aggressive weeds to slow down another farmer's growth rate." },
    { id: 3, name: "Night Thieves", price: 350, success: 50, description: "Hire thieves to steal a small portion of another farmer's harvested crops." },
    { id: 4, name: "Weather Manipulation", price: 500, success: 30, description: "Attempt to create adverse weather conditions for a targeted farm." },
  ];
  
  // Mock data for protection options
  const protectionOptions = [
    { id: 1, name: "Basic Fence", price: 150, protection: 40, description: "Provides basic protection against theft and minor sabotage." },
    { id: 2, name: "Guard Dog", price: 300, protection: 60, description: "Alerts you to intruders and helps protect against thieves." },
    { id: 3, name: "Security System", price: 450, protection: 80, description: "Advanced protection against most types of sabotage attempts." },
  ];
  
  const handlePurchaseMystery = (itemId: number, itemName: string) => {
    toast({
      title: "Black Market Purchase",
      description: `Processing transaction for ${itemName}...`,
    });
    
    // Simulate transaction delay
    setTimeout(() => {
      const successRoll = Math.random() * 100;
      
      if (successRoll < 70) {
        addNotification({
          title: "Mysterious Package Arrived",
          message: "You received something valuable! Check your inventory.",
          type: "success"
        });
      } else {
        addNotification({
          title: "Deal Gone Wrong",
          message: "The mysterious package contained nothing of value. You've been scammed!",
          type: "destructive"
        });
      }
    }, 2000);
  };
  
  const handleSabotage = (itemId: number, itemName: string, successRate: number) => {
    toast({
      title: "Sabotage Attempt",
      description: `Deploying ${itemName}...`,
    });
    
    // Simulate transaction delay
    setTimeout(() => {
      const successRoll = Math.random() * 100;
      
      if (successRoll < successRate) {
        addNotification({
          title: "Sabotage Successful",
          message: "Your sabotage attempt was successful! Target farmer's production reduced.",
          type: "success"
        });
      } else {
        addNotification({
          title: "Sabotage Failed",
          message: "Your sabotage was detected and prevented. Be careful, your reputation may suffer!",
          type: "destructive"
        });
      }
    }, 2000);
  };
  
  const handleBuyProtection = (itemId: number, itemName: string) => {
    toast({
      title: "Protection Purchase",
      description: `Setting up ${itemName} on your farm...`,
    });
    
    setTimeout(() => {
      addNotification({
        title: "Protection Active",
        message: `${itemName} has been installed on your farm. You are now better protected against sabotage.`,
        type: "success"
      });
    }, 2000);
  };
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low': return 'bg-green-500/80';
      case 'Medium': return 'bg-yellow-500/80';
      case 'High': return 'bg-orange-500/80';
      case 'Very High': return 'bg-red-500/80';
      default: return 'bg-yellow-500/80';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Flame className="mr-2 h-6 w-6 text-red-500" />
              Black Market
            </h1>
            <p className="text-muted-foreground">High risk, high reward deals and sabotage</p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletConnect />
          </div>
        </div>
        
        <div className="mb-6">
          <Card className="border-red-500/50 bg-black/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                All transactions here are risky and irreversible. Proceed with caution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Current Reputation: <span className="text-amber-400 font-bold">Neutral</span></p>
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span>Risk Tolerance</span>
                    <span>{riskLevel}%</span>
                  </div>
                  <Slider
                    value={[riskLevel]}
                    min={0}
                    max={100}
                    step={10}
                    onValueChange={(value) => setRiskLevel(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Safe</span>
                    <span>Risky</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="deals" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" /> Mystery Deals
            </TabsTrigger>
            <TabsTrigger value="sabotage" className="flex items-center">
              <Bug className="mr-2 h-4 w-4" /> Sabotage
            </TabsTrigger>
            <TabsTrigger value="protection" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" /> Protection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mysteryDeals.map(item => (
                <Card key={item.id} className="border-gray-800 hover:border-red-500/50 transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className={getRiskColor(item.risk)}>{item.risk} Risk</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-40 bg-gradient-to-br from-gray-900 to-black rounded-md flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 blur-lg flex items-center justify-center">
                        <Skull className="h-20 w-20 text-red-500/20" />
                      </div>
                      <div className="text-2xl font-bold backdrop-blur-md bg-black/50 px-4 py-2 rounded-md border border-red-500/20">
                        ? ? ?
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-bold text-lg text-red-400">{item.price} $SNRB</div>
                    <Button 
                      variant="destructive"
                      onClick={() => handlePurchaseMystery(item.id, item.name)}
                    >
                      Take Risk
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sabotage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sabotageOptions.map(item => (
                <Card key={item.id} className="border-gray-800 hover:border-red-500/50 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bug className="mr-2 h-5 w-5 text-red-500" />
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Success Rate</span>
                          <span>{item.success}%</span>
                        </div>
                        <ProgressBar 
                          value={item.success} 
                          max={100} 
                          variant="season-fall"
                          size="md"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Target</span>
                          <span className="text-muted-foreground">Not Selected</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Select Target Farmer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-bold text-lg text-red-400">{item.price} $SNRB</div>
                    <Button 
                      variant="destructive"
                      onClick={() => handleSabotage(item.id, item.name, item.success)}
                      disabled={riskLevel < 40}
                    >
                      Deploy
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {riskLevel < 40 && (
              <div className="bg-red-950/20 border border-red-500/20 rounded-md p-4 text-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p>Increase your risk tolerance to enable sabotage options.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="protection" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {protectionOptions.map(item => (
                <Card key={item.id} className="border-gray-800 hover:border-blue-500/50 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Protection</span>
                          <span>{item.protection}%</span>
                        </div>
                        <ProgressBar 
                          value={item.protection} 
                          max={100} 
                          variant="season-winter"
                          size="md"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-bold text-lg text-blue-400">{item.price} $SNRB</div>
                    <Button 
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-950/50"
                      onClick={() => handleBuyProtection(item.id, item.name)}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BlackMarket;
