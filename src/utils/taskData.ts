
import { Task, User, FarmCell, Resource, FarmStats } from './types';
import { getUserData, getTasks, getFarmStats } from './localStorage';

// Initialize empty farm grid (5x5)
const initFarmGrid = (): FarmCell[][] => {
  const grid: FarmCell[][] = [];
  for (let i = 0; i < 5; i++) {
    const row: FarmCell[] = [];
    for (let j = 0; j < 5; j++) {
      row.push({
        id: `cell-${i}-${j}`,
        status: 'empty'
      });
    }
    grid.push(row);
  }
  return grid;
};

// Default resources
const defaultResources: Resource[] = [
  { id: 'resource-1', name: 'Seeds', quantity: 10 },
  { id: 'resource-2', name: 'Water', quantity: 20 },
  { id: 'resource-3', name: 'Fertilizer', quantity: 5 },
  { id: 'resource-4', name: 'Tools', quantity: 3 }
];

// Default user data
const defaultUser: User = {
  id: 'user1',
  username: 'SnarbleEnthusiast',
  avatarUrl: '/placeholder.svg',
  totalPoints: 2750,
  level: 15,
  streak: 3,
  taskStats: {
    completed: 24,
    inProgress: 3,
    totalEarned: 2750
  },
  resources: defaultResources,
  farmGrid: initFarmGrid()
};

// Get user data from localStorage or use default
export const currentUser: User = getUserData(defaultUser);

// Default tasks
const defaultTasks: Task[] = [
  {
    id: 'task1',
    title: 'Daily Watering',
    description: 'Water your crops to ensure optimal growth.',
    totalPoints: 50,
    pointsEarned: 50,
    progress: 100,
    category: 'farming',
    isCompleted: true,
    createdAt: '2023-06-15T08:00:00Z',
    recurrence: 'daily',
    steps: [
      {
        id: 'step1-1',
        description: 'Water all planted crops',
        isCompleted: true,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task2',
    title: 'Plant New Seeds',
    description: 'Expand your farm by planting new seeds in empty plots.',
    totalPoints: 200,
    pointsEarned: 150,
    progress: 75,
    category: 'farming',
    isCompleted: false,
    createdAt: '2023-06-14T10:30:00Z',
    steps: [
      {
        id: 'step2-1',
        description: 'Prepare soil in empty plots',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step2-2',
        description: 'Plant seeds in 3 plots',
        isCompleted: true,
        pointValue: 100
      },
      {
        id: 'step2-3',
        description: 'Mark planting date in farm log',
        isCompleted: false,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task3',
    title: 'Harvest Ready Crops',
    description: 'Collect crops that are ready for harvest.',
    totalPoints: 150,
    pointsEarned: 100,
    progress: 66,
    category: 'farming',
    isCompleted: false,
    dueDate: '2023-06-21T23:59:59Z',
    createdAt: '2023-06-15T09:15:00Z',
    recurrence: 'weekly',
    steps: [
      {
        id: 'step3-1',
        description: 'Check crops for harvest readiness',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step3-2',
        description: 'Harvest 2 plots of ready crops',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step3-3',
        description: 'Store harvested crops properly',
        isCompleted: false,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task4',
    title: 'Farming Maintenance',
    description: 'Perform regular maintenance on your farm.',
    totalPoints: 300,
    pointsEarned: 0,
    progress: 0,
    category: 'farming',
    isCompleted: false,
    dueDate: '2023-06-22T23:59:59Z',
    createdAt: '2023-06-16T11:00:00Z',
    recurrence: 'weekly',
    steps: [
      {
        id: 'step4-1',
        description: 'Inspect farm tools',
        isCompleted: false,
        pointValue: 50
      },
      {
        id: 'step4-2',
        description: 'Repair any broken equipment',
        isCompleted: false,
        pointValue: 150
      },
      {
        id: 'step4-3',
        description: 'Organize storage area',
        isCompleted: false,
        pointValue: 100
      }
    ]
  },
  {
    id: 'task5',
    title: 'Expand Farm Area',
    description: 'Clear new areas for farming to increase production.',
    totalPoints: 500,
    pointsEarned: 200,
    progress: 40,
    category: 'farming',
    isCompleted: false,
    createdAt: '2023-06-10T14:20:00Z',
    steps: [
      {
        id: 'step5-1',
        description: 'Survey potential expansion areas',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step5-2',
        description: 'Clear debris from new area',
        isCompleted: true,
        pointValue: 150
      },
      {
        id: 'step5-3',
        description: 'Prepare soil in new plots',
        isCompleted: false,
        pointValue: 300
      }
    ]
  }
];

// Get tasks from localStorage or use default
export const tasks: Task[] = getTasks(defaultTasks);

// Default farm stats for the chart
const defaultFarmStats: FarmStats[] = [
  { date: '2023-06-10', progress: 20, pointsEarned: 100 },
  { date: '2023-06-11', progress: 30, pointsEarned: 150 },
  { date: '2023-06-12', progress: 35, pointsEarned: 175 },
  { date: '2023-06-13', progress: 40, pointsEarned: 200 },
  { date: '2023-06-14', progress: 45, pointsEarned: 225 },
  { date: '2023-06-15', progress: 55, pointsEarned: 275 },
  { date: '2023-06-16', progress: 60, pointsEarned: 300 }
];

// Get farm stats from localStorage or use default
export const farmStats: FarmStats[] = getFarmStats(defaultFarmStats);

// Function to calculate current overall farming progress
export function calculateFarmingProgress(tasksList: Task[]): number {
  const farmingTasks = tasksList.filter(task => task.category === 'farming');
  if (farmingTasks.length === 0) return 0;
  
  const totalProgress = farmingTasks.reduce((sum, task) => sum + task.progress, 0);
  return Math.round(totalProgress / farmingTasks.length);
}
