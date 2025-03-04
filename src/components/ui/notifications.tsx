
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/utils/types';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
  read: boolean;
}

interface NotificationsProps {
  tasks: Task[];
}

const Notifications = ({ tasks }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Generate notifications based on tasks
  useEffect(() => {
    const newNotifications: Notification[] = [];
    
    // Check for overdue tasks
    const today = new Date();
    
    tasks.forEach(task => {
      if (task.dueDate && !task.isCompleted) {
        const dueDate = new Date(task.dueDate);
        
        // Task is overdue
        if (dueDate < today) {
          newNotifications.push({
            id: `overdue-${task.id}`,
            title: 'Overdue Task',
            message: `"${task.title}" was due on ${dueDate.toLocaleDateString()}`,
            type: 'warning',
            timestamp: new Date(),
            read: false
          });
        }
        // Task is due today
        else if (dueDate.toDateString() === today.toDateString()) {
          newNotifications.push({
            id: `due-today-${task.id}`,
            title: 'Due Today',
            message: `"${task.title}" is due today`,
            type: 'info',
            timestamp: new Date(),
            read: false
          });
        }
      }
      
      // Tasks with high progress but not completed
      if (task.progress >= 80 && !task.isCompleted) {
        newNotifications.push({
          id: `almost-complete-${task.id}`,
          title: 'Almost Complete',
          message: `"${task.title}" is at ${task.progress}% - finish it to earn points!`,
          type: 'success',
          timestamp: new Date(),
          read: false
        });
      }
    });
    
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  }, [tasks]);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark all as read when opening
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'border-blue-500 bg-blue-500/10';
      case 'warning': return 'border-amber-500 bg-amber-500/10';
      case 'success': return 'border-primary bg-primary/10';
      default: return 'border-border bg-card';
    }
  };
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={toggleOpen}
        aria-label={`Notifications ${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute top-10 right-0 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-border flex justify-between items-center">
            <h3 className="font-heading font-medium">Notifications</h3>
            <Button variant="ghost" size="sm" className="h-7 w-7" onClick={toggleOpen}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-3 border-l-2 border-b border-border hover:bg-card/50",
                    getNotificationColor(notification.type)
                  )}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 text-muted-foreground -mr-1"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 block">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">No new notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
