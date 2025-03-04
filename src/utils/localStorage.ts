
import { User, Task, FarmStats } from './types';

// Generic function to get items from localStorage
export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
}

// Generic function to save items to localStorage
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Get user data from localStorage
export function getUserData(defaultUser: User): User {
  return getFromStorage<User>('snarbles-user', defaultUser);
}

// Save user data to localStorage
export function saveUserData(user: User): void {
  saveToStorage<User>('snarbles-user', user);
}

// Get tasks from localStorage
export function getTasks(defaultTasks: Task[]): Task[] {
  return getFromStorage<Task[]>('snarbles-tasks', defaultTasks);
}

// Save tasks to localStorage
export function saveTasks(tasks: Task[]): void {
  saveToStorage<Task[]>('snarbles-tasks', tasks);
}

// Get farm stats from localStorage
export function getFarmStats(defaultStats: FarmStats[]): FarmStats[] {
  return getFromStorage<FarmStats[]>('snarbles-farm-stats', defaultStats);
}

// Save farm stats to localStorage
export function saveFarmStats(stats: FarmStats[]): void {
  saveToStorage<FarmStats[]>('snarbles-farm-stats', stats);
}

// Export data to JSON file
export function exportData() {
  const data = {
    user: getFromStorage<User>('snarbles-user', {} as User),
    tasks: getFromStorage<Task[]>('snarbles-tasks', []),
    farmStats: getFromStorage<FarmStats[]>('snarbles-farm-stats', [])
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportName = `snarbles-farm-${new Date().toISOString().slice(0, 10)}`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', `${exportName}.json`);
  linkElement.click();
  linkElement.remove();
}

// Import data from JSON file
export function importData(jsonFile: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const data = JSON.parse(result);
        
        if (data.user) saveUserData(data.user);
        if (data.tasks) saveTasks(data.tasks);
        if (data.farmStats) saveFarmStats(data.farmStats);
        
        resolve(true);
      } catch (error) {
        console.error('Error parsing imported data:', error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };
    
    reader.readAsText(jsonFile);
  });
}

// Reset all data
export function resetAllData(): void {
  localStorage.removeItem('snarbles-user');
  localStorage.removeItem('snarbles-tasks');
  localStorage.removeItem('snarbles-farm-stats');
}
