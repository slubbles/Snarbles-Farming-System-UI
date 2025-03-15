
import { useState, useEffect } from 'react';
import { FarmCell } from '@/utils/types';
import { ChevronRight, Droplet, Leaf, Sun, Clock, Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useNotificationContext } from '@/components/ui/notifications';
import { Button } from '@/components/ui/button';

interface FarmGridProps {
  grid?: FarmCell[][];
  onCellUpdate?: (rowIndex: number, colIndex: number, newStatus: FarmCell['status']) => void;
  resources?: { name: string; quantity: number }[];
}

const FarmGrid = ({ grid, onCellUpdate, resources }: FarmGridProps) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [harvestAnimation, setHarvestAnimation] = useState<{row: number, col: number} | null>(null);
  const { addNotification } = useNotificationContext();
  
  // Sample grid if none provided
  const defaultGrid: FarmCell[][] = Array(5).fill(0).map((_, rowIndex) => 
    Array(5).fill(0).map((_, colIndex) => {
      // First 10 cells are unlocked, the rest are locked
      const cellIndex = rowIndex * 5 + colIndex;
      return {
        id: `cell-${rowIndex}-${colIndex}`,
        status: cellIndex < 10 
          ? ['empty', 'planted', 'growing', 'ready', 'harvested'][
              Math.floor(Math.random() * 5)
            ] as FarmCell['status']
          : 'empty'
      };
    })
  );
  
  const farmGrid = grid || defaultGrid;
  
  const getStatusIcon = (status: FarmCell['status']) => {
    switch (status) {
      case 'planted':
        return <Leaf className="h-6 w-6 text-primary/70" />;
      case 'growing':
        return <Droplet className="h-6 w-6 text-primary/90" />;
      case 'ready':
        return <Sun className="h-6 w-6 text-primary animate-pulse" />;
      case 'harvested':
        return <Clock className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  // Determine if a cell is locked (only first 10 cells are unlocked)
  const isCellLocked = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 5 + colIndex;
    return cellIndex >= 10;
  };
  
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({row: rowIndex, col: colIndex});
    
    // Check if the cell is locked
    if (isCellLocked(rowIndex, colIndex)) {
      toast({
        title: "Plot Locked",
        description: "This farm plot is locked. Purchase an NFT upgrade to unlock additional plots.",
        variant: "destructive"
      });
      return;
    }
    
    if (!onCellUpdate || !resources) return;
    
    const currentStatus = farmGrid[rowIndex][colIndex].status;
    let nextStatus: FarmCell['status'] = 'empty';
    let actionMessage = '';
    let needsResources = false;
    let resourceName = '';
    
    // Determine next status and resource requirements
    switch (currentStatus) {
      case 'empty':
        nextStatus = 'planted';
        actionMessage = 'Plot planted with seeds';
        needsResources = true;
        resourceName = 'Seeds';
        break;
      case 'planted':
        nextStatus = 'growing';
        actionMessage = 'Watered the plants, now growing';
        needsResources = true;
        resourceName = 'Water';
        break;
      case 'growing':
        nextStatus = 'ready';
        actionMessage = 'Plants matured and ready for harvest';
        break;
      case 'ready':
        nextStatus = 'harvested';
        actionMessage = 'Crops harvested successfully!';
        
        // Trigger harvest animation
        setHarvestAnimation({row: rowIndex, col: colIndex});
        
        // Simulate a blockchain transaction
        setTimeout(() => {
          toast({
            title: "On-chain Transaction",
            description: "Harvest transaction confirmed! +250 Testnet Points earned.",
          });
          
          // Add a notification
          addNotification({
            title: "Harvest Successful!",
            message: "You earned 250 Testnet Points from your harvest.",
            type: "success"
          });
          
          setHarvestAnimation(null);
        }, 1500);
        break;
      case 'harvested':
        nextStatus = 'empty';
        actionMessage = 'Plot cleared for new planting';
        needsResources = true;
        resourceName = 'Tools';
        break;
    }
    
    // Check if user has required resources
    if (needsResources) {
      const resource = resources.find(r => r.name === resourceName);
      if (!resource || resource.quantity <= 0) {
        toast({
          title: "Not enough resources",
          description: `You need more ${resourceName.toLowerCase()} to perform this action.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    // Update cell status
    onCellUpdate(rowIndex, colIndex, nextStatus);
    
    // Show success message
    toast({
      title: "Farm Updated",
      description: actionMessage
    });
    
    // Add a notification for important events
    if (currentStatus === 'empty' && nextStatus === 'planted') {
      addNotification({
        title: "Seeds Planted",
        message: "You've planted seeds in your farm. Don't forget to water them!",
        type: "info"
      });
    } else if (currentStatus === 'growing' && nextStatus === 'ready') {
      addNotification({
        title: "Crops Ready!",
        message: "Your crops are ready to harvest! Collect them to earn rewards.",
        type: "success"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-semibold">Farm Plot</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {farmGrid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isLocked = isCellLocked(rowIndex, colIndex);
            const isHarvesting = harvestAnimation?.row === rowIndex && harvestAnimation?.col === colIndex;
            
            return (
              <button
                key={cell.id}
                className={cn(
                  'farm-cell interactive-element relative overflow-hidden',
                  isLocked ? 'farm-cell-locked bg-gray-800/50 border border-gray-700' : `farm-cell-${cell.status}`,
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex && 'ring-2 ring-primary',
                  isHarvesting && 'animate-pulse'
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                aria-label={`Farm cell ${rowIndex+1}-${colIndex+1}, status: ${isLocked ? 'locked' : cell.status}`}
              >
                {isLocked ? (
                  <Lock className="h-6 w-6 text-gray-500" />
                ) : (
                  getStatusIcon(cell.status)
                )}
                
                {/* Harvest animation */}
                {isHarvesting && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="harvest-points-animation">+250</div>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Sparkles 
                        key={i} 
                        className={`absolute h-4 w-4 text-amber-400 coin-animation-${i % 5}`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-card"></div>
          <span>Empty: Ready for planting</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-primary/30"></div>
          <span>Planted: Needs water</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-primary/50"></div>
          <span>Growing: In progress (1-3 days)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>Ready: Can be harvested</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-accent/20"></div>
          <span>Harvested: Can be cleared</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <span>Locked: Requires NFT upgrade</span>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground italic">
        Click on plots to perform actions: plant <ChevronRight className="inline h-3 w-3" /> water <ChevronRight className="inline h-3 w-3" /> harvest <ChevronRight className="inline h-3 w-3" /> clear
      </div>
      
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#3EC7AA] text-[#3EC7AA] hover:bg-[#3EC7AA]/10"
        >
          <Lock className="h-4 w-4 mr-2" /> Upgrade Farm (Unlock Additional Plots)
        </Button>
      </div>
      
      <style jsx global>{`
        .harvest-points-animation {
          position: absolute;
          color: #3EC7AA;
          font-weight: bold;
          font-size: 1.5rem;
          animation: float-up 1.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }
        
        .coin-animation-0 {
          animation: coin-float 1.5s ease-out forwards;
        }
        .coin-animation-1 {
          animation: coin-float 1.7s ease-out forwards;
        }
        .coin-animation-2 {
          animation: coin-float 1.3s ease-out forwards;
        }
        .coin-animation-3 {
          animation: coin-float 1.6s ease-out forwards;
        }
        .coin-animation-4 {
          animation: coin-float 1.4s ease-out forwards;
        }
        
        @keyframes coin-float {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(
              ${Math.random() > 0.5 ? '-' : ''}${Math.random() * 30 + 10}px, 
              -${Math.random() * 30 + 20}px
            ) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FarmGrid;
