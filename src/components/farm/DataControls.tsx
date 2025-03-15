
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Upload, RefreshCw, AlertTriangle, Leaf, Droplet, Sun } from 'lucide-react';
import { exportData, importData, resetAllData } from '@/utils/localStorage';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';
import { DataControlsProps } from './DataControls.d';

const DataControls = ({ data }: DataControlsProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleExport = () => {
    exportData();
    toast({
      title: "Farm Exported",
      description: "Your farm data has been exported successfully."
    });
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    
    try {
      await importData(file);
      toast({
        title: "Farm Imported",
        description: "Your farm data has been imported successfully."
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "There was an error importing your farm data.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleReset = () => {
    resetAllData();
    window.location.reload();
    toast({
      title: "Farm Reset",
      description: "All farm data has been reset successfully."
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-semibold">Farm Summary</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-card/60 border border-border flex flex-col items-center">
          <div className="mb-2 p-2 rounded-full bg-emerald-500/10">
            <Leaf className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold">{data.planted}</div>
          <div className="text-xs text-muted-foreground">Planted</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card/60 border border-border flex flex-col items-center">
          <div className="mb-2 p-2 rounded-full bg-blue-500/10">
            <Droplet className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">{data.growing}</div>
          <div className="text-xs text-muted-foreground">Growing</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card/60 border border-border flex flex-col items-center">
          <div className="mb-2 p-2 rounded-full bg-amber-500/10">
            <Sun className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold">{data.ready}</div>
          <div className="text-xs text-muted-foreground">Ready</div>
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 interactive-element"
          onClick={handleExport}
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save Farm</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 interactive-element"
          onClick={handleImportClick}
          disabled={isImporting}
        >
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Import Farm</span>
          {isImporting && <RefreshCw className="h-3 w-3 animate-spin ml-1" />}
        </Button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".json" 
          onChange={handleFileChange}
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-destructive border-destructive/30 hover:bg-destructive/10 interactive-element"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading">Reset Farm Data</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete all your farming progress, tasks, and resources.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-card hover:bg-card/80">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleReset}
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DataControls;
