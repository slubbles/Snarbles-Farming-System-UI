
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'success';
}

const ProgressBar = ({
  value,
  max,
  className,
  showText = false,
  variant = 'default'
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="space-y-1">
      {showText && (
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>{value.toLocaleString()}/{max.toLocaleString()}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-bar-container">
        <div 
          className={cn(
            "progress-bar",
            variant === 'success' ? "bg-green-500" : "bg-primary",
            className
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
