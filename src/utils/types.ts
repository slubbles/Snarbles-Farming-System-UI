
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
}

export interface TaskStep {
  id: string;
  description: string;
  isCompleted: boolean;
  pointValue: number;
}

export type TaskCategory = 'daily' | 'weekly' | 'campaign' | 'special' | 'community';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  totalPoints: number;
  level: number;
  taskStats: {
    completed: number;
    inProgress: number;
    totalEarned: number;
  };
}
