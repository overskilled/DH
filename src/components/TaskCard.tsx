import { motion } from 'framer-motion';
import { Clock, Play, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { Task } from '@/lib/types';
import { SEED_USERS } from '@/lib/seed-data';
import { useTimer } from '@/hooks/useTimer';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export const TaskCard = ({ task, isDragging }: TaskCardProps) => {
  const { startTimer, runningTimer } = useTimer();
  const { user } = useAuth();
  const timeProgress = (task.spentTime / task.maxTime) * 100;
  const isOvertime = timeProgress > 100;
  const isRunning = runningTimer?.taskId === task.id;
  const canStartTimer = user && task.assignees.includes(user.id);

  const handleStartTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canStartTimer && !isRunning) {
      startTimer(task.id, task.title);
    }
  };

  const assignees = task.assignees
    .map(id => SEED_USERS.find(u => u.id === id))
    .filter(Boolean);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "group cursor-move hover:shadow-md transition-all duration-200",
        isDragging && "opacity-50 rotate-2",
        isRunning && "ring-2 ring-primary"
      )}>
        <CardContent className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm flex-1 line-clamp-2">
              {task.title}
            </h4>
            <StatusBadge status={task.priority} type="priority" />
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <StatusBadge status={task.status} type="task" />
          </div>

          {/* Time Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Time
              </span>
              <span className={`font-medium ${isOvertime ? 'text-destructive' : ''}`}>
                {task.spentTime}h / {task.maxTime}h
              </span>
            </div>
            <Progress 
              value={Math.min(timeProgress, 100)} 
              className={`h-1.5 ${isOvertime ? '[&>div]:bg-destructive' : ''}`}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {/* Assignees */}
            <div className="flex -space-x-2">
              {assignees.slice(0, 3).map((assignee) => (
                assignee && (
                  <UserAvatar
                    key={assignee.id}
                    user={assignee}
                    size="sm"
                    className="ring-2 ring-background"
                  />
                )
              ))}
              {assignees.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center ring-2 ring-background text-xs font-medium">
                  +{assignees.length - 3}
                </div>
              )}
            </div>

            {/* Start Timer Button */}
            {canStartTimer && (
              <Button
                size="sm"
                variant={isRunning ? "destructive" : "ghost"}
                onClick={handleStartTimer}
                disabled={isRunning}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="h-3 w-3" />
                {isRunning ? 'Running' : 'Start'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
