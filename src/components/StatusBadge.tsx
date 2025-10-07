import { Badge } from '@/components/ui/badge';
import { DossierStatus, Priority, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: TaskStatus | DossierStatus | Priority;
    type?: 'task' | 'dossier' | 'priority';
    className?: string;
}

const getStatusConfig = (status: string, type?: string) => {
    const configs: Record<string, { label: string; className: string }> = {
        // Task statuses
        'todo': { label: 'To Do', className: 'bg-muted text-muted-foreground' },
        'in_progress': { label: 'In Progress', className: 'bg-[hsl(var(--status-active))] text-white' },
        'review': { label: 'Review', className: 'bg-[hsl(var(--status-pending))] text-white' },
        'completed': { label: 'Completed', className: 'bg-[hsl(var(--status-completed))] text-white' },

        // Dossier statuses
        'active': { label: 'Active', className: 'bg-[hsl(var(--status-active))] text-white' },
        'pending': { label: 'Pending', className: 'bg-[hsl(var(--status-pending))] text-white' },
        'archived': { label: 'Archived', className: 'bg-muted text-muted-foreground' },

        // Priorities
        'urgent': { label: 'Urgent', className: 'bg-[hsl(var(--priority-urgent))] text-white' },
        'high': { label: 'High', className: 'bg-[hsl(var(--priority-high))] text-white' },
        'medium': { label: 'Medium', className: 'bg-[hsl(var(--priority-medium))] text-white' },
        'low': { label: 'Low', className: 'bg-[hsl(var(--priority-low))] text-white' },
    };

    return configs[status] || { label: status, className: 'bg-muted text-muted-foreground' };
};

export const StatusBadge = ({ status, type, className }: StatusBadgeProps) => {
    const config = getStatusConfig(status, type);

    return (
        <Badge className={cn('font-medium text-xs', config.className, className)}>
            {config.label}
        </Badge>
    );
};
