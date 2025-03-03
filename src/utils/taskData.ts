
import { Task, User } from './types';

export const currentUser: User = {
  id: 'user1',
  username: 'SnarbleEnthusiast',
  avatarUrl: '/placeholder.svg',
  totalPoints: 2750,
  level: 15,
  taskStats: {
    completed: 24,
    inProgress: 3,
    totalEarned: 2750
  }
};

export const tasks: Task[] = [
  {
    id: 'task1',
    title: 'Daily Check-in',
    description: 'Check in to the Snarbles platform to earn daily points.',
    totalPoints: 50,
    pointsEarned: 50,
    progress: 100,
    category: 'daily',
    isCompleted: true,
    createdAt: '2023-06-15T08:00:00Z',
    steps: [
      {
        id: 'step1-1',
        description: 'Log in to Snarbles',
        isCompleted: true,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task2',
    title: 'Learn About Snarbles',
    description: 'Complete the onboarding process to understand how Snarbles works.',
    totalPoints: 200,
    pointsEarned: 150,
    progress: 75,
    category: 'campaign',
    isCompleted: false,
    createdAt: '2023-06-14T10:30:00Z',
    steps: [
      {
        id: 'step2-1',
        description: 'Watch the introduction video',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step2-2',
        description: 'Complete the tutorial',
        isCompleted: true,
        pointValue: 100
      },
      {
        id: 'step2-3',
        description: 'Create your first Snarble',
        isCompleted: false,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task3',
    title: 'Social Media Engagement',
    description: 'Engage with Snarbles on social media platforms to earn points.',
    totalPoints: 150,
    pointsEarned: 100,
    progress: 66,
    category: 'weekly',
    isCompleted: false,
    dueDate: '2023-06-21T23:59:59Z',
    createdAt: '2023-06-15T09:15:00Z',
    steps: [
      {
        id: 'step3-1',
        description: 'Follow Snarbles on Twitter',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step3-2',
        description: 'Share a Snarbles post',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step3-3',
        description: 'Tag three friends in a Snarbles post',
        isCompleted: false,
        pointValue: 50
      }
    ]
  },
  {
    id: 'task4',
    title: 'Community Challenge',
    description: 'Participate in the weekly community challenge to earn bonus points.',
    totalPoints: 300,
    pointsEarned: 0,
    progress: 0,
    category: 'community',
    isCompleted: false,
    dueDate: '2023-06-22T23:59:59Z',
    createdAt: '2023-06-16T11:00:00Z',
    steps: [
      {
        id: 'step4-1',
        description: 'Join the community challenge',
        isCompleted: false,
        pointValue: 50
      },
      {
        id: 'step4-2',
        description: 'Submit your entry',
        isCompleted: false,
        pointValue: 150
      },
      {
        id: 'step4-3',
        description: 'Vote on other entries',
        isCompleted: false,
        pointValue: 100
      }
    ]
  },
  {
    id: 'task5',
    title: 'Referral Program',
    description: 'Invite friends to join Snarbles and earn points for each successful referral.',
    totalPoints: 500,
    pointsEarned: 200,
    progress: 40,
    category: 'special',
    isCompleted: false,
    createdAt: '2023-06-10T14:20:00Z',
    steps: [
      {
        id: 'step5-1',
        description: 'Generate your referral link',
        isCompleted: true,
        pointValue: 50
      },
      {
        id: 'step5-2',
        description: 'First friend joins (2/5)',
        isCompleted: true,
        pointValue: 150
      },
      {
        id: 'step5-3',
        description: 'Five friends join',
        isCompleted: false,
        pointValue: 300
      }
    ]
  }
];
