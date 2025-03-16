
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'success' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar = ({
  value,
  max,
  className,
  showText = false,
  variant = 'default',
  size = 'md'
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Determine height based on size
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }[size];
  
  // Determine color based on variant
  const colorClass = {
    default: "bg-primary",
    success: "bg-snarbles-green",
    secondary: "bg-[#3EC7AA]"
  }[variant];
  
  return (
    <div className="space-y-1.5">
      {showText && (
        <div className="flex justify-between text-xs font-medium">
          <span className="text-foreground">{value.toLocaleString()}/{max.toLocaleString()}</span>
          <span className="font-bold text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heightClass)}>
        <div 
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            colorClass,
            className
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
