
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Task, TaskStep } from '@/utils/types';

interface NewTaskDialogProps {
  onTaskAdd: (task: Task) => void;
}

const NewTaskDialog = ({ onTaskAdd }: NewTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'daily' | 'weekly' | 'campaign' | 'special' | 'community'>('daily');
  const [steps, setSteps] = useState<Omit<TaskStep, 'id'>[]>([
    { description: '', isCompleted: false, pointValue: 50 }
  ]);
  const [dueDate, setDueDate] = useState('');

  const handleAddStep = () => {
    setSteps([...steps, { description: '', isCompleted: false, pointValue: 50 }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStepDescription = (index: number, description: string) => {
    const newSteps = [...steps];
    newSteps[index].description = description;
    setSteps(newSteps);
  };

  const updateStepPoints = (index: number, points: number) => {
    const newSteps = [...steps];
    newSteps[index].pointValue = points;
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (steps.some(step => !step.description.trim())) {
      toast({
        title: "Error",
        description: "All step descriptions are required",
        variant: "destructive",
      });
      return;
    }

    const totalPoints = steps.reduce((sum, step) => sum + step.pointValue, 0);
    
    const newTask: Task = {
      id: `task${Date.now()}`,
      title,
      description,
      totalPoints,
      pointsEarned: 0,
      progress: 0,
      category,
      isCompleted: false,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${Date.now()}-${index}`
      })),
      createdAt: new Date().toISOString(),
      ...(dueDate ? { dueDate: new Date(dueDate).toISOString() } : {})
    };
    
    onTaskAdd(newTask);
    
    toast({
      title: "Task created",
      description: "You can now start completing task steps!",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('daily');
    setSteps([{ description: '', isCompleted: false, pointValue: 50 }]);
    setDueDate('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-snarbles-red hover:bg-snarbles-red/90 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-snarbles-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
              placeholder="Task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-snarbles-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red min-h-[80px]"
              placeholder="Describe this task"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-snarbles-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="campaign">Campaign</option>
              <option value="special">Special</option>
              <option value="community">Community</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-snarbles-gray-700">
              Due Date (Optional)
            </label>
            <input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-snarbles-gray-700">
                Task Steps
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-xs text-snarbles-red hover:text-snarbles-red/80"
              >
                + Add Step
              </button>
            </div>
            
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateStepDescription(index, e.target.value)}
                      className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
                      placeholder="Step description"
                      required
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      value={step.pointValue}
                      min={1}
                      onChange={(e) => updateStepPoints(index, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-snarbles-gray-300 rounded-lg focus:ring-1 focus:ring-snarbles-red focus:border-snarbles-red"
                      placeholder="Points"
                      required
                    />
                  </div>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      className="text-snarbles-gray-400 hover:text-snarbles-red"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-snarbles-red hover:bg-snarbles-red/90 text-white"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
