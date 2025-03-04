
import { Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter = ({ streak }: StreakCounterProps) => {
  // Generate last 7 days for streak display
  const generateStreakDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const isActive = i < streak % 7;
      days.push({ isActive });
    }
    return days;
  };
  
  const streakDays = generateStreakDays();
  
  return (
    <div className="bg-card/50 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" /> Farming Streak
        </h3>
        <div className="flex items-center gap-1">
          <Award className={cn(
            "h-5 w-5",
            streak > 0 ? "text-primary" : "text-muted-foreground"
          )} />
          <span className="text-xl font-semibold">{streak}</span>
          <span className="text-sm text-muted-foreground">days</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center gap-1 mt-2">
        {streakDays.map((day, i) => (
          <div 
            key={i}
            className={cn(
              "h-2 rounded-full flex-1 transition-all",
              day.isActive ? "bg-primary animate-pulse" : "bg-muted"
            )}
          />
        ))}
      </div>
      
      {streak >= 7 && (
        <div className="mt-3 text-sm text-primary">
          <span className="font-medium">Streak bonus active!</span> +10% points on all tasks
        </div>
      )}
      
      {streak === 0 && (
        <div className="mt-3 text-sm text-muted-foreground">
          Complete a task today to start your streak!
        </div>
      )}
    </div>
  );
};

export default StreakCounter;
