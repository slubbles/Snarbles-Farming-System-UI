
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { CheckCircle, ArrowRight, Tractor, LineChart, Trophy } from "lucide-react";
import { currentUser, tasks } from '@/utils/taskData';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import FarmGrid from '@/components/farm/FarmGrid';

const Dashboard = () => {
  const today = new Date();
  const [completedTasks, setCompletedTasks] = useState(currentUser.taskStats.completed);
  const [inProgressTasks, setInProgressTasks] = useState(currentUser.taskStats.inProgress);
  const [totalPoints, setTotalPoints] = useState(currentUser.totalPoints);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Today is {format(today, 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] hover:opacity-90" asChild>
              <Link to="/tasks">View All Tasks</Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Stats Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>Number of tasks completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{completedTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tasks In Progress</CardTitle>
                <CardDescription>Number of tasks currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{inProgressTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Points</CardTitle>
                <CardDescription>Total points earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalPoints}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Task Progress */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <CheckCircle className="mr-2 h-6 w-6" />
              Task Progress
            </h2>
            <Button variant="outline" asChild>
              <Link to="/tasks">
                View All Tasks <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.slice(0, 3).map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">
                    Progress: {task.progress}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-[#2DB87F] to-[#0D6B36] h-2.5 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" asChild>
                    <Link to={`/tasks`}>
                      View Task <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Farm Overview */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Tractor className="mr-2 h-6 w-6" />
              Farm Overview
            </h2>
            <Button variant="outline" asChild>
              <Link to="/farm">
                Manage Farm <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Status</CardTitle>
                <CardDescription>Current crops and growth status</CardDescription>
              </CardHeader>
              <CardContent>
                <FarmGrid />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Available resources for farming</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-0">
                  {currentUser.resources.map((resource) => (
                    <li key={resource.id} className="py-2 border-b border-border last:border-none">
                      {resource.name}: {resource.quantity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Trophy className="mr-2 h-6 w-6" />
              Leaderboard Preview
            </h2>
            <Button variant="outline" asChild>
              <Link to="/leaderboard">
                View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Players</CardTitle>
              <CardDescription>See who's leading the farming competition</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5">
                <li>Player 1 - 12,500 Points</li>
                <li>Player 2 - 11,800 Points</li>
                <li>Player 3 - 11,200 Points</li>
                <li>Player 4 - 10,900 Points</li>
                <li>Player 5 - 10,500 Points</li>
              </ol>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
