"use client"

import { FolderOpen, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { hasPermission } from '@/lib/permissions';
import { useAuthStore } from '@/stores/useAuthStore';
import DashboardRouter from '@/components/DashboardRouter';



const Dashboard = () => {
  const { user, accessToken, logout } = useAuthStore();
  const { dossiers, tasks, timeEntries } = useStore();

  if (!user) return null;

  // Filter data based on user permissions
  const userDossiers = hasPermission(user, 'dossier:view')
    ? dossiers.filter((d: any) =>
      user.role === 'ADMIN' || user.role === 'BOARD' || d.departmentId === user.departmentId
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
          Welcome back, {`${user.firstName} ${user.lastName}`}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your cases today
        </p>
      </div>


      <main>
        <DashboardRouter />
      </main>
    </div>
  );
};

export default Dashboard;
