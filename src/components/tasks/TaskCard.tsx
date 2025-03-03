
import { useState } from 'react';
import { Task, TaskStep } from '@/utils/types';
import { CheckCircle, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface TaskCardProps {
  task: Task;
  onTaskUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskCard = ({ task, onTaskUpdate }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [flashingStep, setFlashingStep] = useState<string | null>(null);

  const toggleExpanded = () => setExpanded(!expanded);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  const handleStepToggle = (step: TaskStep) => {
    if (step.isCompleted) return; // Prevent uncompleting a step
    
    const updatedSteps = task.steps.map(s => 
      s.id === step.id ? { ...s, isCompleted: true } : s
    );
    
    const newPointsEarned = task.pointsEarned + step.pointValue;
    const newProgress = Math.round((updatedSteps.filter(s => s.isCompleted).length / updatedSteps.length) * 100);
    const newIsCompleted = newProgress === 100;
    
    setFlashingStep(step.id);
    setTimeout(() => setFlashingStep(null), 1500);
    
    onTaskUpdate(task.id, {
      steps: updatedSteps,
      pointsEarned: newPointsEarned,
      progress: newProgress,
      isCompleted: newIsCompleted
    });
    
    toast({
      title: `+${step.pointValue} points earned!`,
      description: `You completed: ${step.description}`,
      duration: 3000,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      case 'campaign': return 'bg-green-100 text-green-800';
      case 'special': return 'bg-yellow-100 text-yellow-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={cn(
        "subtle-glass bg-white border rounded-xl p-5 shadow-sm task-card-hover mb-4",
        task.isCompleted ? "border-green-200 bg-green-50/30" : "border-snarbles-gray-200"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium rounded-full px-2 py-0.5", getCategoryColor(task.category))}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
            {task.dueDate && (
              <span className="flex items-center text-xs text-snarbles-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          <h3 className={cn(
            "text-lg font-semibold mb-1",
            task.isCompleted ? "text-green-700" : "text-snarbles-gray-900"
          )}>
            {task.title}
          </h3>
          <p className="text-snarbles-gray-600 text-sm line-clamp-2 mb-3">{task.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-snarbles-gray-900">
              {task.pointsEarned}/{task.totalPoints}
            </span>
            <Award className="h-5 w-5 text-snarbles-red" />
          </div>
          <button 
            onClick={toggleExpanded}
            className="text-snarbles-gray-500 hover:text-snarbles-red transition-colors"
            aria-label={expanded ? "Collapse task details" : "Expand task details"}
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="progress-bar-container">
          <div 
            className={cn(
              "progress-bar",
              task.isCompleted ? "bg-green-500" : "bg-snarbles-red"
            )}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-snarbles-gray-200 animate-fade-in">
          <h4 className="font-medium text-sm mb-2 text-snarbles-gray-900">Task Steps:</h4>
          <ul className="space-y-3">
            {task.steps.map((step) => (
              <li 
                key={step.id}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg transition-all",
                  flashingStep === step.id ? "bg-snarbles-red/10 animate-pulse" : "",
                  step.isCompleted ? "text-green-700" : "text-snarbles-gray-700",
                  !step.isCompleted && isHovering ? "hover:bg-snarbles-gray-100 cursor-pointer" : ""
                )}
                onClick={() => !step.isCompleted && handleStepToggle(step)}
              >
                <CheckCircle className={cn(
                  "h-5 w-5 mt-0.5",
                  step.isCompleted ? "text-green-600" : "text-snarbles-gray-400" 
                )} />
                <div className="flex-1">
                  <span className={step.isCompleted ? "line-through opacity-80" : ""}>
                    {step.description}
                  </span>
                  {!step.isCompleted && (
                    <div className="text-xs mt-1 font-medium text-snarbles-red">
                      +{step.pointValue} points
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
