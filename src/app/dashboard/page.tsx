"use client"

import { motion } from 'framer-motion';
import { FolderOpen, Clock, DollarSign, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/hooks/useStore';
import { hasPermission } from '@/lib/permissions';
import { SEED_USERS } from '@/lib/seed-data';
import { StatusBadge } from '@/components/StatusBadge';
import { DepartmentBadge } from '@/components/DepartmentBadge';



const Dashboard = () => {
  const { user } = useAuth();
  const { dossiers, tasks, timeEntries } = useStore();

  if (!user) return null;

  // Filter data based on user permissions
  const userDossiers = hasPermission(user, 'dossier:view')
    ? dossiers.filter((d: any) => 
        user.role === 'admin' || user.role === 'partner' || d.departmentId === user.departmentId
      )
    : [];

  const activeDossiers = userDossiers.filter((d: any) => d.status === 'active');
  const myTasks = tasks.filter((t: any) => t.assignees.includes(user.id));
  const pendingTasks = myTasks.filter((t: any) => t.status !== 'completed');
  const userTimeEntries = timeEntries.filter((te: any) => te.userId === user.id);
  
  const totalBillableHours = userTimeEntries.reduce((sum: any, te: any) => sum + te.duration, 0);
  const totalRevenue = userTimeEntries.reduce((sum: any, te: any) => sum + (te.duration * te.hourlyRate), 0);

  const stats = [
    {
      title: 'Active Dossiers',
      value: activeDossiers.length,
      description: 'Currently in progress',
      icon: FolderOpen,
      color: 'text-[hsl(var(--status-active))]',
      bg: 'bg-[hsl(var(--status-active))]/10',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.length,
      description: 'Assigned to you',
      icon: AlertCircle,
      color: 'text-[hsl(var(--status-pending))]',
      bg: 'bg-[hsl(var(--status-pending))]/10',
    },
    {
      title: 'Billable Hours',
      value: totalBillableHours.toFixed(1),
      description: 'This month',
      icon: Clock,
      color: 'text-[hsl(var(--dept-ip))]',
      bg: 'bg-[hsl(var(--dept-ip))]/10',
    },
    {
      title: 'Revenue',
      value: `${totalRevenue.toLocaleString()} FCFA`,
      description: 'Total generated',
      icon: DollarSign,
      color: 'text-[hsl(var(--status-completed))]',
      bg: 'bg-[hsl(var(--status-completed))]/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your cases today
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Dossiers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Dossiers</CardTitle>
              <CardDescription>
                Your most recently updated cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDossiers.slice(0, 5).map((dossier: any) => {
                  const referent = SEED_USERS.find(u => u.id === dossier.referentId);
                  const progress = (dossier.spent / dossier.budget) * 100;
                  
                  return (
                    <div key={dossier.id} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{dossier.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            Ref: {referent?.name}
                          </p>
                          <DepartmentBadge departmentId={dossier.departmentId} />
                        </div>
                        <StatusBadge status={dossier.status} type="dossier" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Budget Usage</span>
                          <span className="font-medium">{progress.toFixed(0)}%</span>
                        </div>
                        {/* <Progress value={progress} className="h-2" /> */}
                        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                          <span>{dossier.spent.toLocaleString()} FCFA</span>
                          <span>{dossier.budget.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTasks.slice(0, 5).map((task: any) => {
                  const timeProgress = (task.spentTime / task.maxTime) * 100;
                  const isOvertime = timeProgress > 100;
                  
                  return (
                    <div key={task.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                          <div className="flex gap-2 items-center">
                            <StatusBadge status={task.status} type="task" />
                            <StatusBadge status={task.priority} type="priority" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Time Spent</span>
                          <span className={`font-medium ${isOvertime ? 'text-destructive' : ''}`}>
                            {task.spentTime}h / {task.maxTime}h
                          </span>
                        </div>
                        {/* <Progress 
                          value={Math.min(timeProgress, 100)} 
                          className={`h-2 ${isOvertime ? '[&>div]:bg-destructive' : ''}`}
                        /> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
