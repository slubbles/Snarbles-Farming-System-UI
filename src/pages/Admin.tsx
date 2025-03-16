
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter, 
  RefreshCw, 
  Search, 
  Shield, 
  User, 
  Users, 
  Wallet, 
  Leaf,
  TrendingUp,
  Landmark,
  Activity,
  Calendar
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from '@/components/ui/use-toast';
import ProgressBar from '@/components/ui/ProgressBar';

interface FarmStatistics {
  totalFarmers: number;
  activeFarmers: number;
  totalHarvests: number;
  totalSeeds: number;
  totalPoints: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface MultiChartData {
  name: string;
  users: number;
  harvests: number;
  points: number;
}

// Mock data
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i+1}`,
  wallet: `0x${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 6)}`,
  level: Math.floor(Math.random() * 20) + 1,
  points: Math.floor(Math.random() * 15000) + 500,
  plots: Math.floor(Math.random() * 20) + 5,
  harvests: Math.floor(Math.random() * 100) + 10,
  seeds: Math.floor(Math.random() * 200) + 20,
  lastActive: new Date(Date.now() - Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000).toLocaleDateString(),
}));

const mockStats: FarmStatistics = {
  totalFarmers: 3578,
  activeFarmers: 1842,
  totalHarvests: 42519,
  totalSeeds: 138427,
  totalPoints: 3247891
};

// Enhanced mock data for multi-series chart
const mockTrendData: MultiChartData[] = [
  { name: 'Mon', users: 120, harvests: 240, points: 4200 },
  { name: 'Tue', users: 132, harvests: 290, points: 4800 },
  { name: 'Wed', users: 145, harvests: 310, points: 5200 },
  { name: 'Thu', users: 162, harvests: 370, points: 5600 },
  { name: 'Fri', users: 180, harvests: 410, points: 6100 },
  { name: 'Sat', users: 220, harvests: 490, points: 7200 },
  { name: 'Sun', users: 250, harvests: 520, points: 8400 },
];

const mockChartData: ChartData[] = [
  { name: 'Mon', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Tue', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Wed', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Thu', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Fri', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Sat', value: Math.floor(Math.random() * 500) + 100 },
  { name: 'Sun', value: Math.floor(Math.random() * 500) + 100 },
];

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Simulate checking if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      // In a real app, you would make a backend call to verify the wallet is an admin
      const connectedWallet = localStorage.getItem('walletAddress');
      // For demo purposes, any connected wallet is considered an admin
      const hasAdminAccess = !!connectedWallet;
      
      // Auto-grant admin access for demo
      setIsAdmin(true);
      setIsLoading(false);
    };
    
    checkAdminStatus();

    // Force dark mode on admin page
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light-mode');
  }, []);
  
  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(mockUsers.filter(user => 
        user.wallet.toLowerCase().includes(query) ||
        user.level.toString().includes(query) ||
        user.points.toString().includes(query)
      ));
    } else {
      setFilteredUsers(mockUsers);
    }
    setCurrentPage(1);
  }, [searchQuery]);
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const handleDownloadCsv = () => {
    toast({
      title: "Export Started",
      description: "User data is being exported to CSV"
    });
    // In a real app, this would generate and download a CSV file
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 mt-16 flex items-center justify-center min-h-[60vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh] max-w-lg mx-auto">
            <div className="mb-6 bg-destructive/10 p-6 rounded-full">
              <Shield className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-6">
              You need administrator privileges to access this page. Please connect with an admin wallet.
            </p>
            <Button
              className="gradient-button"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading flex items-center">
              <Shield className="mr-2 h-6 w-6 text-primary" /> Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage the Snarbles ecosystem
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 7 Days
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Total Farmers</p>
                <p className="text-2xl font-bold">{mockStats.totalFarmers.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Active Farmers</p>
                <p className="text-2xl font-bold">{mockStats.activeFarmers.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Total Harvests</p>
                <p className="text-2xl font-bold">{mockStats.totalHarvests.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{mockStats.totalPoints.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Total Seeds</p>
                <p className="text-2xl font-bold">{mockStats.totalSeeds.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="farms">Farms</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={mockChartData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Ecosystem Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockTrendData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="users" stroke="#9B87F5" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="harvests" stroke="#3EC7AA" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Key Metrics Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border-l-4 border-primary bg-card/50">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</h3>
                    <p className="text-xl font-bold">24.8%</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +2.4% from last week
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border-l-4 border-primary bg-card/50">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Retention Rate</h3>
                    <p className="text-xl font-bold">68.2%</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +5.1% from last week
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border-l-4 border-primary bg-card/50">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Session</h3>
                    <p className="text-xl font-bold">12.4m</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +1.2m from last week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="flex items-center gap-1" onClick={handleDownloadCsv}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Wallet</TableHead>
                      <TableHead className="font-medium">Level</TableHead>
                      <TableHead className="font-medium">Points</TableHead>
                      <TableHead className="font-medium">Plots</TableHead>
                      <TableHead className="font-medium">Harvests</TableHead>
                      <TableHead className="font-medium">Seeds</TableHead>
                      <TableHead className="font-medium">Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((user) => (
                      <TableRow key={user.id} className="table-row-highlight">
                        <TableCell className="font-mono">{user.wallet}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {user.level}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{user.points.toLocaleString()}</TableCell>
                        <TableCell>{user.plots}</TableCell>
                        <TableCell>{user.harvests}</TableCell>
                        <TableCell>{user.seeds}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="farms" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Farm Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-primary" />
                      Farm Distribution
                    </h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={[
                            { name: '0-5 Plots', value: 845 },
                            { name: '6-10 Plots', value: 1245 },
                            { name: '11-15 Plots', value: 891 },
                            { name: '16-20 Plots', value: 432 },
                            { name: '20+ Plots', value: 165 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', border: 'none' }} />
                          <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-lg border border-border bg-card/50">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Farm Health Metrics
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">Average Harvest Rate</span>
                          <span className="text-sm font-medium text-primary">72%</span>
                        </div>
                        <ProgressBar value={72} max={100} showText={false} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">Plot Utilization</span>
                          <span className="text-sm font-medium text-primary">84%</span>
                        </div>
                        <ProgressBar value={84} max={100} showText={false} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">Resource Efficiency</span>
                          <span className="text-sm font-medium text-primary">68%</span>
                        </div>
                        <ProgressBar value={68} max={100} showText={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Transaction Volume
                    </h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { name: 'Week 1', value: 4200 },
                            { name: 'Week 2', value: 3800 },
                            { name: 'Week 3', value: 5100 },
                            { name: 'Week 4', value: 6700 },
                            { name: 'Week 5', value: 7900 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', border: 'none' }} />
                          <Line type="monotone" dataKey="value" stroke="#9B87F5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      Recent Transactions
                    </h3>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-card/70 rounded-lg border border-border/30 hover:border-border/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <Leaf className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Harvest Transaction</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(Date.now() - i * 3600000).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-400">+{250 + i * 50} Points</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              0x{Math.random().toString(36).substring(2, 10)}...
                            </p>
                          </div>
                        </div>
                      ))}
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

export default AdminPage;
