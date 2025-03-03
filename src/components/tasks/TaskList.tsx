
import { useState } from 'react';
import { Task } from '@/utils/types';
import TaskCard from './TaskCard';
import { Search, Filter, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskList = ({ tasks, onTaskUpdate }: TaskListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'inProgress'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'points' | 'progress'>('newest');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const categories = ['all', 'daily', 'weekly', 'campaign', 'special', 'community'];

  const filteredTasks = tasks.filter(task => {
    // Search term filter
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Completion status filter
    const matchesStatus = 
      filter === 'all' || 
      (filter === 'completed' && task.isCompleted) || 
      (filter === 'inProgress' && !task.isCompleted);
    
    // Category filter
    const matchesCategory = 
      categoryFilter === 'all' || 
      task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'points') {
      return b.totalPoints - a.totalPoints;
    } else { // progress
      return b.progress - a.progress;
    }
  });

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md sticky top-16 z-10 pt-4 pb-2 border-b border-snarbles-gray-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-snarbles-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-snarbles-gray-500" />
              <select 
                className="rounded-lg border border-snarbles-gray-300 py-2 px-3 focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'inProgress')}
              >
                <option value="all">All Status</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <select 
              className="rounded-lg border border-snarbles-gray-300 py-2 px-3 focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select 
              className="rounded-lg border border-snarbles-gray-300 py-2 px-3 focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'points' | 'progress')}
            >
              <option value="newest">Sort: Newest</option>
              <option value="points">Sort: Points</option>
              <option value="progress">Sort: Progress</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskCard key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
          ))
        ) : (
          <div className="text-center py-8">
            <Award className="h-12 w-12 mx-auto text-snarbles-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-snarbles-gray-700">No matching tasks found</h3>
            <p className="text-snarbles-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
