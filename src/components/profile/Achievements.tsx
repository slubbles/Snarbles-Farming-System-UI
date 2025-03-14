
import { Award, Check, Trophy, Sprout, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Achievements</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {unlockedCount} of {totalCount} achievements unlocked ({progressPercentage}%)
        </p>
        
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={cn(
              "achievement-card p-4 rounded-lg border transition-all duration-300",
              achievement.unlocked 
                ? "bg-card border-[#2DB87F]/50 shadow-sm hover:shadow-md hover:border-[#2DB87F]" 
                : "bg-card/50 border-border/50 opacity-70"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="achievement-badge">
                <div className="achievement-badge-inner">
                  {achievement.icon}
                </div>
                {achievement.unlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-[#2DB87F] rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <h4 className={cn(
                  "font-medium text-sm",
                  achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-[#2DB87F] mt-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {achievement.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
