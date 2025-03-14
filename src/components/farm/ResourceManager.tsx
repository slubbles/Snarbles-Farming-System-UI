
import { useState } from 'react';
import { Resource } from '@/utils/types';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface ResourceManagerProps {
  resources: Resource[];
  onUpdate?: (name: string, change: number) => void;
  onResourceUpdate: (updatedResources: Resource[]) => void;
}

const ResourceManager = ({ resources, onUpdate, onResourceUpdate }: ResourceManagerProps) => {
  const [newResourceName, setNewResourceName] = useState('');
  
  const incrementResource = (id: string) => {
    const updatedResources = resources.map(resource => 
      resource.id === id 
        ? { ...resource, quantity: resource.quantity + 1 } 
        : resource
    );
    onResourceUpdate(updatedResources);
    
    // Call the onUpdate prop if it exists
    if (onUpdate) {
      const resource = resources.find(r => r.id === id);
      if (resource) {
        onUpdate(resource.name, 1);
      }
    }
  };
  
  const decrementResource = (id: string) => {
    const updatedResources = resources.map(resource => 
      resource.id === id 
        ? { ...resource, quantity: Math.max(0, resource.quantity - 1) } 
        : resource
    );
    onResourceUpdate(updatedResources);
    
    // Call the onUpdate prop if it exists
    if (onUpdate) {
      const resource = resources.find(r => r.id === id);
      if (resource) {
        onUpdate(resource.name, -1);
      }
    }
  };
  
  const deleteResource = (id: string) => {
    const updatedResources = resources.filter(resource => resource.id !== id);
    onResourceUpdate(updatedResources);
    toast({
      title: "Resource Removed",
      description: "The resource has been removed from your inventory."
    });
  };
  
  const addNewResource = () => {
    if (!newResourceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the new resource.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if resource already exists
    if (resources.some(r => r.name.toLowerCase() === newResourceName.toLowerCase())) {
      toast({
        title: "Duplicate Resource",
        description: "This resource already exists in your inventory.",
        variant: "destructive"
      });
      return;
    }
    
    const newResource: Resource = {
      id: `resource-${Date.now()}`,
      name: newResourceName,
      quantity: 10
    };
    
    onResourceUpdate([...resources, newResource]);
    setNewResourceName('');
    
    toast({
      title: "Resource Added",
      description: `${newResourceName} has been added to your inventory.`
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-semibold">Resources</h3>
      
      <div className="grid grid-cols-1 gap-2">
        {resources.map(resource => (
          <div key={resource.id} className="resource-item">
            <span className="font-medium">{resource.name}</span>
            
            <div className="resource-controls">
              <span className="text-sm">{resource.quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7 rounded-full"
                onClick={() => decrementResource(resource.id)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7 rounded-full interactive-element"
                onClick={() => incrementResource(resource.id)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-destructive hover:text-destructive/90"
                onClick={() => deleteResource(resource.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-4">
        <Input
          placeholder="New resource name"
          value={newResourceName}
          onChange={(e) => setNewResourceName(e.target.value)}
          className="bg-card border-border"
        />
        <Button 
          variant="outline" 
          className="interactive-element"
          onClick={addNewResource}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default ResourceManager;
