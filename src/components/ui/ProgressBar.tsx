
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'success' | 'secondary' | 'season-spring' | 'season-summer' | 'season-fall' | 'season-winter';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const ProgressBar = ({
  value,
  max,
  className,
  showText = false,
  variant = 'default',
  size = 'md',
  animated = true
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Determine height based on size
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5'
  }[size];
  
  // Determine color based on variant
  const colorClass = {
    default: "bg-primary",
    success: "bg-snarbles-green",
    secondary: "bg-[#3EC7AA]",
    'season-spring': "bg-gradient-to-r from-emerald-400 to-green-500",
    'season-summer': "bg-gradient-to-r from-amber-400 to-yellow-500",
    'season-fall': "bg-gradient-to-r from-orange-400 to-red-500",
    'season-winter': "bg-gradient-to-r from-blue-400 to-indigo-500"
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
            animated && "relative overflow-hidden",
            className
          )}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 translate-x-[-10%] skew-x-[-20deg] w-20 h-full bg-white/10 animate-shimmer"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
