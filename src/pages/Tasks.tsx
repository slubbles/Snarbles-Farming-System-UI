
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import TaskList from '@/components/tasks/TaskList';
import NewTaskDialog from '@/components/tasks/NewTaskDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from '@/utils/types';
import { tasks as initialTasks } from '@/utils/taskData';
import { CheckCircle, Clock, Award, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';
import { toast } from '@/components/ui/use-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  const totalPoints = tasks.reduce((sum, task) => sum + task.pointsEarned, 0);
  const availablePoints = tasks.reduce((sum, task) => sum + (task.totalPoints - task.pointsEarned), 0);
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const inProgressTasks = tasks.filter(task => !task.isCompleted).length;
  
  const handleTaskUpdate = (taskId: string, updatedFields: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedFields } 
          : task
      )
    );
    
    // Show a toast notification when a task is completed
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.isCompleted && updatedFields.isCompleted) {
      toast({
        title: "Task Completed! 🎉",
        description: `You've earned ${task.totalPoints} points and seeds for your farm!`,
        variant: "default",
      });
    }
  };
  
  const handleTaskAdd = (task: Task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
    toast({
      title: "New Task Added",
      description: "You've added a new task to your list!",
    });
  };
  
  return (
    <Layout>
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 font-heading">Farming Tasks</h1>
            <p className="text-muted-foreground">Complete tasks to earn seeds and grow your Snarbles farm</p>
          </div>
          <NewTaskDialog onTaskAdd={handleTaskAdd} />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-in">
          <div className="subtle-glass p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Earned Points</h3>
              <Award className="h-5 w-5 text-[#2DB87F]" />
            </div>
            <p className="text-2xl font-bold mt-2">{totalPoints.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Points to spend on farm upgrades
            </p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Available Points</h3>
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{availablePoints.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Points you can still earn
            </p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{completedTasks}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks completed successfully
            </p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{inProgressTasks}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks still in progress
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="all" className="text-sm">All Tasks</TabsTrigger>
            <TabsTrigger value="inProgress" className="text-sm">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <TaskList 
              tasks={tasks} 
              onTaskUpdate={handleTaskUpdate} 
            />
          </TabsContent>
          
          <TabsContent value="inProgress" className="mt-0">
            <TaskList 
              tasks={tasks.filter(task => !task.isCompleted)} 
              onTaskUpdate={handleTaskUpdate} 
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <TaskList 
              tasks={tasks.filter(task => task.isCompleted)} 
              onTaskUpdate={handleTaskUpdate} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
};

export default Tasks;
