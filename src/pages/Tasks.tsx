
import { useState } from 'react';
import Header from '@/components/layout/Header';
import TaskList from '@/components/tasks/TaskList';
import NewTaskDialog from '@/components/tasks/NewTaskDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from '@/utils/types';
import { tasks as initialTasks } from '@/utils/taskData';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

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
  };
  
  const handleTaskAdd = (task: Task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tasks</h1>
            <p className="text-snarbles-gray-600">Complete tasks to earn points and unlock rewards</p>
          </div>
          <NewTaskDialog onTaskAdd={handleTaskAdd} />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="subtle-glass p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-snarbles-gray-600">Earned Points</h3>
              <Award className="h-5 w-5 text-snarbles-red" />
            </div>
            <p className="text-2xl font-bold mt-2">{totalPoints.toLocaleString()}</p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-snarbles-gray-600">Available Points</h3>
              <Award className="h-5 w-5 text-snarbles-gray-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{availablePoints.toLocaleString()}</p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-snarbles-gray-600">Completed</h3>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{completedTasks}</p>
          </div>
          
          <div className="subtle-glass p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-snarbles-gray-600">In Progress</h3>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{inProgressTasks}</p>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
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
    </div>
  );
};

export default Tasks;
