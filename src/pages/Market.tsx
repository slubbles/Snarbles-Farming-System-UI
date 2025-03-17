
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Search, Filter, ArrowUpDown, ShoppingCart, TrendingUp, Zap } from "lucide-react";
import WalletConnect from "@/components/wallet/WalletConnect";
import { toast } from "@/components/ui/use-toast";
import { useNotificationContext } from "@/components/ui/notifications";

const Market = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const [searchTerm, setSearchTerm] = useState("");
  const { addNotification } = useNotificationContext();
  
  // Mock data for marketplace listings
  const listings = [
    { id: 1, name: "Premium Wheat Seeds", seller: "0x8F...42d", price: 125, rarity: "Rare", season: "Summer" },
    { id: 2, name: "Organic Corn", seller: "0x9D...A1c", price: 75, rarity: "Common", season: "Fall" },
    { id: 3, name: "Golden Carrots", seller: "0x3B...F5e", price: 220, rarity: "Epic", season: "Spring" },
    { id: 4, name: "Blue Rose Seeds", seller: "0x2C...D7b", price: 350, rarity: "Legendary", season: "Winter" },
    { id: 5, name: "Pumpkin Seeds", seller: "0x1A...E8c", price: 90, rarity: "Uncommon", season: "Fall" },
    { id: 6, name: "Apple Tree Sapling", seller: "0x5F...B3d", price: 175, rarity: "Rare", season: "Spring" },
  ];
  
  const handleBuy = (itemId: number, itemName: string) => {
    toast({
      title: "Purchase Initiated",
      description: `Processing transaction for ${itemName}...`,
    });
    
    // Simulate transaction processing
    setTimeout(() => {
      addNotification({
        title: "Purchase Successful",
        message: `You've successfully purchased ${itemName}!`,
        type: "success"
      });
    }, 2000);
  };
  
  const handleMakeOffer = (itemId: number, itemName: string) => {
    toast({
      title: "Offer Sent",
      description: `Your offer for ${itemName} has been sent to the seller.`,
    });
  };

  const filteredListings = listings.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rarity.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Common': return 'text-gray-400';
      case 'Uncommon': return 'text-green-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-amber-400';
      default: return 'text-gray-400';
    }
  };
  
  const getSeasonIcon = (season: string) => {
    switch(season) {
      case 'Spring': return '🌱';
      case 'Summer': return '☀️';
      case 'Fall': return '🍂';
      case 'Winter': return '❄️';
      default: return '🌱';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">P2P Marketplace</h1>
            <p className="text-muted-foreground">Trade crops and resources with other farmers</p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletConnect />
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, season, or rarity..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="sm:w-auto w-full">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="sm:w-auto w-full">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="listings" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" /> Market Listings
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" /> Live Offers
            </TabsTrigger>
            <TabsTrigger value="auctions" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" /> Auctions
            </TabsTrigger>
            <TabsTrigger value="mylistings" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" /> My Listings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map(item => (
                <Card key={item.id} className="card-hover overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <span className={`${getRarityColor(item.rarity)} font-semibold`}>{item.rarity}</span>
                    </div>
                    <CardDescription>
                      Seller: {item.seller} · {getSeasonIcon(item.season)} {item.season} Crop
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-40 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-md flex items-center justify-center">
                      <div className="text-6xl">{getSeasonIcon(item.season)}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-bold text-lg text-primary">{item.price} $SNRB</div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMakeOffer(item.id, item.name)}
                      >
                        Make Offer
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBuy(item.id, item.name)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found. Try a different search term.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle>Live Offers</CardTitle>
                <CardDescription>View and respond to offers from other farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  You have no active offers at this time.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Live Auctions</CardTitle>
                <CardDescription>Bid on rare and exclusive items</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  No auctions are currently active. Check back soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mylistings">
            <Card>
              <CardHeader>
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Manage your active marketplace listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't listed any items for sale yet.
                  </p>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Create Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Market Statistics</CardTitle>
            <CardDescription>Real-time marketplace data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stats-card p-4">
                <h3 className="text-lg font-medium">Total Volume</h3>
                <p className="text-2xl font-bold text-primary">24,892 $SNRB</p>
              </div>
              <div className="stats-card p-4">
                <h3 className="text-lg font-medium">Active Listings</h3>
                <p className="text-2xl font-bold text-primary">374</p>
              </div>
              <div className="stats-card p-4">
                <h3 className="text-lg font-medium">Floor Price</h3>
                <p className="text-2xl font-bold text-primary">43 $SNRB</p>
              </div>
              <div className="stats-card p-4">
                <h3 className="text-lg font-medium">24h Change</h3>
                <p className="text-2xl font-bold text-green-500">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Market;
