
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
  Wallet 
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/components/ui/use-toast';

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
      
      setIsAdmin(hasAdminAccess);
      setIsLoading(false);
    };
    
    checkAdminStatus();
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
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
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
              className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90"
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
              <Shield className="mr-2 h-6 w-6 text-[#3EC7AA]" /> Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage the Snarbles ecosystem
            </p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 text-[#3EC7AA] mb-2" />
                <p className="text-xs text-muted-foreground">Total Farmers</p>
                <p className="text-2xl font-bold">{mockStats.totalFarmers.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <User className="h-5 w-5 text-[#3EC7AA] mb-2" />
                <p className="text-xs text-muted-foreground">Active Farmers</p>
                <p className="text-2xl font-bold">{mockStats.activeFarmers.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <BarChart className="h-5 w-5 text-[#3EC7AA] mb-2" />
                <p className="text-xs text-muted-foreground">Total Harvests</p>
                <p className="text-2xl font-bold">{mockStats.totalHarvests.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Wallet className="h-5 w-5 text-[#3EC7AA] mb-2" />
                <p className="text-xs text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{mockStats.totalPoints.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <svg className="h-5 w-5 text-[#3EC7AA] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8c.5 1.125 3 4 7 4s6.5-2.875 7-4" />
                  <path d="M12 12v8" />
                  <path d="M8 16.033a6 3 0 0 0 8 0" />
                  <path d="M12 2s1.9 1.9 0 4" />
                </svg>
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
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
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
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3EC7AA" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative">
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
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Wallet</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Plots</TableHead>
                      <TableHead>Harvests</TableHead>
                      <TableHead>Seeds</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono">{user.wallet}</TableCell>
                        <TableCell>{user.level}</TableCell>
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
              <span className="text-sm">
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
            <Card>
              <CardHeader>
                <CardTitle>Farm Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Farm management tools coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Transaction history will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
