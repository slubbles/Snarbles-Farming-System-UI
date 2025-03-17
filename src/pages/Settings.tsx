
import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Settings as SettingsIcon, User, Bell, Lock, Shield, Cloud, Eye, EyeOff, Wallet } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNotificationContext } from "@/components/ui/notifications";
import WalletConnect from "@/components/wallet/WalletConnect";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { addNotification } = useNotificationContext();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [autoHarvestEnabled, setAutoHarvestEnabled] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [username, setUsername] = useState("SnarbleEnthusiast");
  const [email, setEmail] = useState("farmer@example.com");
  
  // Mock wallet data
  const walletData = {
    address: "0x8F3d9B8Ff9D23C6A9A6d7247b77c89AB8Cb5D42d",
    privateKey: "0x8f3d9b8ff9d23c6a9a6d7247b77c89ab8cb5d42d7247b77c89ab8cb5d42d7247",
    balance: 5240,
    networkId: 42161 // Arbitrum
  };
  
  const saveSettings = (settingType: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${settingType} settings have been updated.`,
    });
    
    addNotification({
      title: "Settings Updated",
      message: `Your ${settingType} settings have been saved successfully.`,
      type: "success"
    });
  };
  
  const disconnectAllSessions = () => {
    toast({
      title: "Sessions Disconnected",
      description: "All other active sessions have been disconnected.",
    });
  };
  
  const exportData = () => {
    toast({
      title: "Data Export Requested",
      description: "Your data export is being prepared. You'll receive an email when it's ready.",
    });
  };
  
  const deleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email to confirm account deletion.",
      variant: "destructive"
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SettingsIcon className="mr-2 h-6 w-6" />
              Settings
            </h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              orientation="vertical"
              className="w-full"
            >
              <TabsList className="flex flex-col h-auto items-stretch bg-card p-1 mb-6">
                <TabsTrigger value="account" className="flex items-center justify-start text-left mb-1 py-3">
                  <User className="mr-2 h-4 w-4" /> Account
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center justify-start text-left mb-1 py-3">
                  <Wallet className="mr-2 h-4 w-4" /> Wallet
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center justify-start text-left mb-1 py-3">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center justify-start text-left mb-1 py-3">
                  <Lock className="mr-2 h-4 w-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center justify-start text-left mb-1 py-3">
                  <Shield className="mr-2 h-4 w-4" /> Privacy
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center justify-start text-left py-3">
                  <Cloud className="mr-2 h-4 w-4" /> Advanced
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="md:col-span-9">
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your basic account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <Badge variant="outline" className="ml-2">Recommended</Badge>
                    </div>
                    <Switch 
                      id="public-profile" 
                      checked={publicProfile}
                      onCheckedChange={setPublicProfile}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button onClick={() => saveSettings('account')}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallet" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Connection</CardTitle>
                  <CardDescription>Manage your connected wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Connected Wallet</Label>
                    <div className="mt-2">
                      <WalletConnect />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="wallet-address">Wallet Address</Label>
                    <div className="flex">
                      <Input 
                        id="wallet-address" 
                        value={walletData.address} 
                        readOnly
                      />
                      <Button variant="outline" className="ml-2" onClick={() => {
                        navigator.clipboard.writeText(walletData.address);
                        toast({ title: "Address Copied", description: "Wallet address copied to clipboard" });
                      }}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="private-key">Private Key</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                      >
                        {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex">
                      <Input 
                        id="private-key" 
                        type={showPrivateKey ? "text" : "password"} 
                        value={showPrivateKey ? walletData.privateKey : "••••••••••••••••••••••••••••••••••••••••••••"}
                        readOnly
                      />
                      <Button variant="outline" className="ml-2" onClick={() => {
                        navigator.clipboard.writeText(walletData.privateKey);
                        toast({ title: "Key Copied", description: "Private key copied to clipboard" });
                      }}>
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Never share your private key with anyone
                    </p>
                  </div>
                  
                  <div>
                    <Label>Network</Label>
                    <p className="text-sm mt-1">
                      Connected to: <Badge variant="outline" className="ml-1">Arbitrum (Testnet)</Badge>
                    </p>
                  </div>
                  
                  <div>
                    <Label>Balance</Label>
                    <p className="text-xl font-bold mt-1 text-primary">{walletData.balance} $SNRB</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enable Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications about farm activities and rewards</p>
                      </div>
                      <Switch 
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sound Effects</h3>
                        <p className="text-sm text-muted-foreground">Play sounds for important actions and events</p>
                      </div>
                      <Switch 
                        checked={soundsEnabled}
                        onCheckedChange={setSoundsEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Auto-Harvest Alerts</h3>
                        <p className="text-sm text-muted-foreground">Get notified when crops are ready for harvest</p>
                      </div>
                      <Switch 
                        checked={autoHarvestEnabled}
                        onCheckedChange={setAutoHarvestEnabled}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => saveSettings('notification')}>
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Active Sessions</h3>
                    <div className="bg-card/50 border border-border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={disconnectAllSessions}
                    >
                      Disconnect All Other Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Public Profile</h3>
                      <p className="text-sm text-muted-foreground">Allow other users to view your profile and farm</p>
                    </div>
                    <Switch 
                      checked={publicProfile}
                      onCheckedChange={setPublicProfile}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show on Leaderboard</h3>
                      <p className="text-sm text-muted-foreground">Display your username and progress on public leaderboards</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Data Collection</h3>
                      <p className="text-sm text-muted-foreground">Allow anonymous usage data collection to improve the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => saveSettings('privacy')}>
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Options</CardTitle>
                  <CardDescription>Access advanced account features and options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Data Export</h3>
                    <p className="text-sm text-muted-foreground mb-2">Download a copy of your farm data and account history</p>
                    <Button variant="outline" onClick={exportData}>
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">Permanent actions that cannot be undone</p>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={deleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
