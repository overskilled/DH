import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

export const UserAvatar = ({ user, size = 'md', className }: UserAvatarProps) => {
  const initials = user.firstName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
