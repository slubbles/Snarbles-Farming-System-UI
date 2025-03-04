
import { useState, useEffect } from 'react';
import { User, Task, FarmStats, FarmCell, Resource } from '@/utils/types';
import { currentUser as initialUser, tasks as initialTasks, farmStats as initialStats, calculateFarmingProgress } from '@/utils/taskData';
import { saveUserData, saveTasks, saveFarmStats } from '@/utils/localStorage';
import Header from '@/components/layout/Header';
import FarmGrid from '@/components/farm/FarmGrid';
import ResourceManager from '@/components/farm/ResourceManager';
import StreakCounter from '@/components/farm/StreakCounter';
import FarmStats from '@/components/farm/FarmStats';
import DataControls from '@/components/farm/DataControls';
import Notifications from '@/components/ui/notifications';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Plant, ListTodo, BarChart3, GanttChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import TaskList from '@/components/tasks/TaskList';
import NewTaskDialog from '@/components/tasks/NewTaskDialog';

const Dashboard = () => {
  const [user, setUser] = useState<User>(initialUser);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [stats, setStats] = useState<FarmStats[]>(initialStats);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  
  // Initialize farm data
  useEffect(() => {
    const progress = calculateFarmingProgress(tasks);
    setOverallProgress(progress);
    
    // Update stats for today if not already present
    const today = new Date().toISOString().split('T')[0];
    if (!stats.some(stat => stat.date === today)) {
      const totalPointsToday = tasks.reduce((sum, task) => {
        const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
        return taskDate === today ? sum + task.pointsEarned : sum;
      }, 0);
      
      const newStats = [
        ...stats,
        { date: today, progress, pointsEarned: totalPointsToday }
      ];
      
      setStats(newStats);
      saveFarmStats(newStats);
    }
  }, []);
  
  // Update cell in the farm grid
  const handleCellUpdate = (rowIndex: number, colIndex: number, newStatus: FarmCell['status']) => {
    const updatedGrid = [...user.farmGrid];
    updatedGrid[rowIndex][colIndex] = {
      ...updatedGrid[rowIndex][colIndex],
      status: newStatus
    };
    
    // If planting, set the planted date
    if (newStatus === 'planted') {
      updatedGrid[rowIndex][colIndex].plantedDate = new Date().toISOString();
    }
    
    // If harvesting, set the harvest date
    if (newStatus === 'harvested') {
      updatedGrid[rowIndex][colIndex].harvestDate = new Date().toISOString();
    }
    
    // Update resources based on actions
    let resourceToUpdate = '';
    let updatedResources = [...user.resources];
    
    switch (newStatus) {
      case 'planted':
        resourceToUpdate = 'Seeds';
        break;
      case 'growing':
        resourceToUpdate = 'Water';
        break;
      case 'harvested':
        // Add harvest points
        const updatedUser = {
          ...user,
          totalPoints: user.totalPoints + 50,
          taskStats: {
            ...user.taskStats,
            totalEarned: user.taskStats.totalEarned + 50
          },
          farmGrid: updatedGrid
        };
        setUser(updatedUser);
        saveUserData(updatedUser);
        
        // Show harvest points notification
        toast({
          title: "Harvested!",
          description: "You earned 50 points for harvesting crops."
        });
        return;
      case 'empty':
        resourceToUpdate = 'Tools';
        break;
    }
    
    // Deduct resource if applicable
    if (resourceToUpdate) {
      updatedResources = updatedResources.map(resource => 
        resource.name === resourceToUpdate
          ? { ...resource, quantity: Math.max(0, resource.quantity - 1) }
          : resource
      );
    }
    
    // Update user with new grid and resources
    const updatedUser = {
      ...user,
      farmGrid: updatedGrid,
      resources: updatedResources
    };
    
    setUser(updatedUser);
    saveUserData(updatedUser);
    
    // Update farm stats
    const farmProgress = calculateFarmProgress(updatedGrid);
    setOverallProgress(farmProgress);
    
    // Update today's stats
    const today = new Date().toISOString().split('T')[0];
    const updatedStats = stats.map(stat => 
      stat.date === today ? { ...stat, progress: farmProgress } : stat
    );
    
    setStats(updatedStats);
    saveFarmStats(updatedStats);
  };
  
  // Calculate farm progress from grid
  const calculateFarmProgress = (grid: FarmCell[][]): number => {
    let total = 0;
    let valueMap = {
      'empty': 0,
      'planted': 25,
      'growing': 50,
      'ready': 75,
      'harvested': 100
    };
    
    grid.forEach(row => {
      row.forEach(cell => {
        total += valueMap[cell.status];
      });
    });
    
    return Math.round(total / (grid.length * grid[0].length));
  };
  
  // Update resources
  const handleResourceUpdate = (updatedResources: Resource[]) => {
    const updatedUser = {
      ...user,
      resources: updatedResources
    };
    
    setUser(updatedUser);
    saveUserData(updatedUser);
  };
  
  // Update a task
  const handleTaskUpdate = (taskId: string, updatedTask: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    
    // Update overall progress
    const progress = calculateFarmingProgress(updatedTasks);
    setOverallProgress(progress);
    
    // Check if a task was completed
    const taskWasCompleted = updatedTask.isCompleted && 
      !tasks.find(t => t.id === taskId)?.isCompleted;
    
    if (taskWasCompleted) {
      // Update user stats
      const completedTask = updatedTasks.find(t => t.id === taskId);
      const pointsEarned = completedTask?.pointsEarned || 0;
      
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints + pointsEarned,
        streak: user.streak + 1,
        taskStats: {
          completed: user.taskStats.completed + 1,
          inProgress: user.taskStats.inProgress - 1,
          totalEarned: user.taskStats.totalEarned + pointsEarned
        }
      };
      
      setUser(updatedUser);
      saveUserData(updatedUser);
      
      // Update today's stats
      const today = new Date().toISOString().split('T')[0];
      const todayStat = stats.find(stat => stat.date === today);
      
      if (todayStat) {
        const updatedStats = stats.map(stat => 
          stat.date === today ? { 
            ...stat, 
            progress, 
            pointsEarned: stat.pointsEarned + pointsEarned 
          } : stat
        );
        
        setStats(updatedStats);
        saveFarmStats(updatedStats);
      } else {
        const newStats = [
          ...stats,
          { date: today, progress, pointsEarned }
        ];
        
        setStats(newStats);
        saveFarmStats(newStats);
      }
    }
  };
  
  // Add a new task
  const handleTaskAdd = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    
    // Update user stats
    const updatedUser = {
      ...user,
      taskStats: {
        ...user.taskStats,
        inProgress: user.taskStats.inProgress + 1
      }
    };
    
    setUser(updatedUser);
    saveUserData(updatedUser);
  };
  
  // Handle data import
  const handleDataImported = () => {
    // Reload data from localStorage
    window.location.reload();
  };
  
  // Handle data reset
  const handleDataReset = () => {
    // Reload page to reset all state
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-background farm-background">
      <Header>
        <div className="flex items-center gap-2">
          <Notifications tasks={tasks} />
          <DataControls 
            onDataImported={handleDataImported}
            onDataReset={handleDataReset}
          />
        </div>
      </Header>
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-heading font-bold">
            Snarbles Farming Strategy
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2 bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-heading">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Total farming progress</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <ProgressBar 
                value={overallProgress} 
                max={100} 
                className="glow-hover" 
                variant={overallProgress === 100 ? 'success' : 'default'} 
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-card/80 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="text-xl font-medium mt-1">{user.totalPoints.toLocaleString()}</div>
                </div>
                <div className="bg-card/80 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Completed Tasks</div>
                  <div className="text-xl font-medium mt-1">{user.taskStats.completed}</div>
                </div>
                <div className="bg-card/80 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Current Level</div>
                  <div className="text-xl font-medium mt-1">{user.level}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="col-span-1">
            <StreakCounter streak={user.streak} />
          </div>
        </div>
        
        <Tabs defaultValue="farm">
          <TabsList className="mb-4">
            <TabsTrigger value="farm" className="interactive-element">
              <Plant className="h-4 w-4 mr-2" />
              Farm
            </TabsTrigger>
            <TabsTrigger value="tasks" className="interactive-element">
              <ListTodo className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="stats" className="interactive-element">
              <BarChart3 className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="resources" className="interactive-element">
              <GanttChart className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="farm" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="col-span-3">
                <Card className="bg-card/50 border-border h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-heading">Farm Grid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FarmGrid 
                      grid={user.farmGrid} 
                      onCellUpdate={handleCellUpdate} 
                      resources={user.resources}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-2">
                <Card className="bg-card/50 border-border h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-heading">Farm Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Plot Distribution</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['empty', 'planted', 'growing', 'ready', 'harvested'].map(status => {
                          const count = user.farmGrid.flat().filter(cell => cell.status === status).length;
                          const total = user.farmGrid.flat().length;
                          const percentage = Math.round((count / total) * 100);
                          
                          return (
                            <div key={status} className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full farm-cell-${status}`}></div>
                              <span className="text-xs capitalize">{status}</span>
                              <span className="text-xs text-muted-foreground ml-auto">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Quick Stats</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Ready to Harvest</span>
                            <span>{user.farmGrid.flat().filter(cell => cell.status === 'ready').length} plots</span>
                          </div>
                          <ProgressBar 
                            value={user.farmGrid.flat().filter(cell => cell.status === 'ready').length} 
                            max={user.farmGrid.flat().length}
                            className="mt-1 h-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Growing</span>
                            <span>{user.farmGrid.flat().filter(cell => cell.status === 'growing').length} plots</span>
                          </div>
                          <ProgressBar 
                            value={user.farmGrid.flat().filter(cell => cell.status === 'growing').length} 
                            max={user.farmGrid.flat().length}
                            className="mt-1 h-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Empty Plots</span>
                            <span>{user.farmGrid.flat().filter(cell => cell.status === 'empty').length} plots</span>
                          </div>
                          <ProgressBar 
                            value={user.farmGrid.flat().filter(cell => cell.status === 'empty').length} 
                            max={user.farmGrid.flat().length}
                            className="mt-1 h-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full interactive-element"
                        onClick={() => {
                          if (user.resources.find(r => r.name === 'Seeds')?.quantity === 0) {
                            toast({
                              title: "Not enough seeds",
                              description: "Add more seeds in the Resources tab.",
                              variant: "destructive"
                            });
                            return;
                          }
                          
                          // Find first empty cell
                          let updated = false;
                          const updatedGrid = [...user.farmGrid];
                          
                          for (let i = 0; i < updatedGrid.length; i++) {
                            for (let j = 0; j < updatedGrid[i].length; j++) {
                              if (updatedGrid[i][j].status === 'empty' && !updated) {
                                handleCellUpdate(i, j, 'planted');
                                updated = true;
                                break;
                              }
                            }
                            if (updated) break;
                          }
                          
                          if (!updated) {
                            toast({
                              title: "No empty plots",
                              description: "Harvest some crops to free up space.",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        <Plant className="h-4 w-4 mr-2" /> Plant Next Available Plot
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="animate-fade-in">
            <div className="flex justify-end mb-4">
              <NewTaskDialog onTaskAdd={handleTaskAdd} />
            </div>
            <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </TabsContent>
          
          <TabsContent value="stats" className="animate-fade-in">
            <FarmStats stats={stats} />
          </TabsContent>
          
          <TabsContent value="resources" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-heading">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResourceManager 
                    resources={user.resources}
                    onResourceUpdate={handleResourceUpdate}
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-heading">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Resources are consumed as you perform farming actions:
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                        <span className="text-sm">Seeds are used when planting on empty plots</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/50"></div>
                        <span className="text-sm">Water is used when caring for planted crops</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent/20"></div>
                        <span className="text-sm">Tools are used when clearing harvested plots</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-4">
                      <p>Add more resources in the Resources panel as needed.</p>
                      <p className="mt-2">Resources are stored between sessions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
