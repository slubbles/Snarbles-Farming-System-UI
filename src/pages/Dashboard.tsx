
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { CheckCircle, ArrowRight, Tractor, LineChart, Trophy, Wallet, Lock } from "lucide-react";
import { currentUser, tasks } from '@/utils/taskData';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import FarmGrid from '@/components/farm/FarmGrid';
import WalletConnect from '@/components/wallet/WalletConnect';

const Dashboard = () => {
  const today = new Date();
  const [completedTasks, setCompletedTasks] = useState(currentUser.taskStats.completed);
  const [inProgressTasks, setInProgressTasks] = useState(currentUser.taskStats.inProgress);
  const [totalPoints, setTotalPoints] = useState(currentUser.totalPoints);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    // Check if wallet is connected
    const connected = localStorage.getItem('walletConnected') === 'true';
    setIsWalletConnected(connected);
  }, []);

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {!isWalletConnected ? (
          // Wallet Connection Required
          <div className="h-[70vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="mb-6 p-5 rounded-full bg-[#2DB87F]/10">
              <Lock className="h-12 w-12 text-[#2DB87F]" />
            </div>
            <h1 className="text-3xl font-bold mb-4 font-heading">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-8">
              You need to connect your wallet to access your Snarbles dashboard. Connect now to view your farm, track your progress, and earn rewards.
            </p>
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        ) : (
          // Dashboard content when wallet is connected
          <>
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
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
              <h2 className="text-2xl font-bold mb-4 font-heading">Stats Overview</h2>
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
                <h2 className="text-2xl font-bold flex items-center font-heading">
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
                  <Card key={task.id} className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-2">
                        Progress: {task.progress}%
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
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
                <h2 className="text-2xl font-bold flex items-center font-heading">
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
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Farm Status</CardTitle>
                    <CardDescription>You have 10 farm plots available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FarmGrid grid={currentUser.farmGrid} />
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Available resources for farming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none pl-0">
                      {currentUser.resources.map((resource) => (
                        <li key={resource.id} className="py-2 border-b border-border last:border-none">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{resource.name}</span>
                            <span className="badge bg-secondary px-2 py-1 rounded-full text-sm">{resource.quantity}</span>
                          </div>
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
                <h2 className="text-2xl font-bold flex items-center font-heading">
                  <Trophy className="mr-2 h-6 w-6" />
                  Leaderboard Preview
                </h2>
                <Button variant="outline" asChild>
                  <Link to="/leaderboard">
                    View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle>Top 5 Players</CardTitle>
                  <CardDescription>See who's leading the farming competition</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-border">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium">Player 1</span>
                      </div>
                      <span>12,500 Points</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-border">
                      <div className="flex items-center">
                        <span className="w-5 text-center font-medium mr-2">2</span>
                        <span className="font-medium">Player 2</span>
                      </div>
                      <span>11,800 Points</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-border">
                      <div className="flex items-center">
                        <span className="w-5 text-center font-medium mr-2">3</span>
                        <span className="font-medium">Player 3</span>
                      </div>
                      <span>11,200 Points</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-border">
                      <div className="flex items-center">
                        <span className="w-5 text-center font-medium mr-2">4</span>
                        <span className="font-medium">Player 4</span>
                      </div>
                      <span>10,900 Points</span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="w-5 text-center font-medium mr-2">5</span>
                        <span className="font-medium">Player 5</span>
                      </div>
                      <span>10,500 Points</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
