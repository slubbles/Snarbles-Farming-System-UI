
export interface Task {
  id: string;
  title: string;
  description: string;
  totalPoints: number;
  pointsEarned: number;
  progress: number; // 0-100
  steps: TaskStep[];
  category: TaskCategory;
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'none';
}

export interface TaskStep {
  id: string;
  description: string;
  isCompleted: boolean;
  pointValue: number;
}

export type TaskCategory = 'daily' | 'weekly' | 'campaign' | 'special' | 'community' | 'farming';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  totalPoints: number;
  level: number;
  streak: number; // Added streak for farming consistency
  taskStats: {
    completed: number;
    inProgress: number;
    totalEarned: number;
  };
  resources: Resource[]; // Added resources for farming inventory
  farmGrid: FarmCell[][]; // Added farm grid
}

export interface Resource {
  id: string;
  name: string;
  quantity: number;
  icon?: string;
}

export interface FarmCell {
  id: string;
  status: 'empty' | 'planted' | 'growing' | 'ready' | 'harvested';
  crop?: string;
  plantedDate?: string;
  harvestDate?: string;
}

export interface FarmStats {
  date: string;
  progress: number;
  pointsEarned: number;
}
