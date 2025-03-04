
import { useState } from 'react';
import { FarmCell } from '@/utils/types';
import { ChevronRight, Droplets, Seedling, Sun, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface FarmGridProps {
  grid: FarmCell[][];
  onCellUpdate: (rowIndex: number, colIndex: number, newStatus: FarmCell['status']) => void;
  resources: { name: string; quantity: number }[];
}

const FarmGrid = ({ grid, onCellUpdate, resources }: FarmGridProps) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  
  const getStatusIcon = (status: FarmCell['status']) => {
    switch (status) {
      case 'planted':
        return <Seedling className="h-6 w-6 text-primary/70" />;
      case 'growing':
        return <Droplets className="h-6 w-6 text-primary/90" />;
      case 'ready':
        return <Sun className="h-6 w-6 text-primary animate-pulse" />;
      case 'harvested':
        return <Clock className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({row: rowIndex, col: colIndex});
    
    const currentStatus = grid[rowIndex][colIndex].status;
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
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-semibold">Farm Plot</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={cell.id}
              className={cn(
                'farm-cell interactive-element flex items-center justify-center',
                `farm-cell-${cell.status}`,
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex && 'ring-2 ring-primary'
              )}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              aria-label={`Farm cell ${rowIndex+1}-${colIndex+1}, status: ${cell.status}`}
            >
              {getStatusIcon(cell.status)}
            </button>
          ))
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
          <span>Growing: In progress</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>Ready: Can be harvested</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent/20"></div>
          <span>Harvested: Can be cleared</span>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground italic">
        Click on plots to perform actions: plant <ChevronRight className="inline h-3 w-3" /> water <ChevronRight className="inline h-3 w-3" /> harvest <ChevronRight className="inline h-3 w-3" /> clear
      </div>
    </div>
  );
};

export default FarmGrid;
