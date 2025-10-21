import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Crown, Star, Shield, Award, Circle } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface UserAvatarProps {
  user: User;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
  showRole?: boolean;
  showBadge?: boolean;
  borderColor?: string;
  onClick?: () => void;
  isOnline?: boolean;
  isActive?: boolean;
}

const sizeClasses = {
  xs: 'h-5 w-5 text-[10px]',
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
};

const statusSizeClasses = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

// Define the badge config type
type BadgeConfig = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  title: string;
};

type RoleKey = 'ADMIN' | 'BOARD' | 'ASSOCIATE' | 'SENIOR' | 'MID' | 'JUNIOR' | 'ACCOUNTANT';

const getRoleBadge = (role: string, size: string) => {
  const badgeSize = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
  }[size];

  const badgeConfigs: Record<RoleKey, BadgeConfig> = {
    ADMIN: { icon: Crown, color: 'bg-red-500', title: 'Administrator' },
    BOARD: { icon: Shield, color: 'bg-purple-500', title: 'Board Member' },
    ASSOCIATE: { icon: Award, color: 'bg-blue-500', title: 'Associate' },
    SENIOR: { icon: Star, color: 'bg-green-500', title: 'Senior Lawyer' },
    MID: { icon: Star, color: 'bg-yellow-500', title: 'Mid-level Lawyer' },
    JUNIOR: { icon: Circle, color: 'bg-gray-500', title: 'Junior Lawyer' },
    ACCOUNTANT: { icon: Award, color: 'bg-orange-500', title: 'Accountant' },
  };

  const badgeConfig = badgeConfigs[role as RoleKey] || { icon: Circle, color: 'bg-gray-400', title: role };

  const IconComponent = badgeConfig.icon;

  return (
    <div
      className={cn(
        'absolute -top-0.5 -right-0.5 rounded-full border-2 border-background flex items-center justify-center',
        badgeConfig.color,
        badgeSize
      )}
      title={badgeConfig.title}
    >
      <IconComponent className="text-white" style={{ width: '60%', height: '60%' }} />
    </div>
  );
};

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    ADMIN: 'bg-gradient-to-br from-red-500 to-red-600',
    BOARD: 'bg-gradient-to-br from-purple-500 to-purple-600',
    ASSOCIATE: 'bg-gradient-to-br from-blue-500 to-blue-600',
    SENIOR: 'bg-gradient-to-br from-green-500 to-green-600',
    MID: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    JUNIOR: 'bg-gradient-to-br from-gray-500 to-gray-600',
    ACCOUNTANT: 'bg-gradient-to-br from-orange-500 to-orange-600',
  };
  return colors[role] || 'bg-gradient-to-br from-gray-500 to-gray-600';
};

const getDepartmentColor = (department?: any) => {
  if (!department?.colorHex) return 'bg-primary';

  // Create a subtle gradient using the department color
  return `bg-gradient-to-br from-[${department.colorHex}] to-[${department.colorHex}]99`;
};

export const UserAvatar = ({
  user,
  size = 'md',
  className,
  showStatus = false,
  showRole = false,
  showBadge = false,
  borderColor,
  onClick,
  isOnline = false,
  isActive = true
}: UserAvatarProps) => {
  const initials = user?.firstName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  const avatarContent = (
    <Avatar
      className={cn(
        sizeClasses[size],
        'relative transition-all duration-200',
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        !isActive && 'opacity-50 grayscale',
        borderColor && 'ring-2 ring-offset-2 ring-offset-background',
        className
      )}
      style={borderColor ? {
        borderColor: borderColor
      } : undefined}
      onClick={onClick}
    >
      <AvatarImage
        src={user?.profilePic || undefined}
        alt={`${user?.firstName} ${user?.lastName}`}
        className="object-cover"
      />
      <AvatarFallback
        className={cn(
          'font-semibold text-white shadow-sm',
          getRoleColor(user?.role),
          user?.department && !user?.role && getDepartmentColor(user.department)
        )}
      >
        {initials}
      </AvatarFallback>

      {/* Online Status Indicator */}
      {showStatus && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            isOnline ? 'bg-green-500' : 'bg-gray-400',
            statusSizeClasses[size]
          )}
          title={isOnline ? 'Online' : 'Offline'}
        />
      )}

      {/* Role Badge */}
      {showBadge && user?.role && getRoleBadge(user.role, size)}
    </Avatar>
  );

  if (showRole && user?.role) {
    return (
      <div className="flex items-center gap-2 group">
        {avatarContent}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs text-muted-foreground capitalize truncate">
            {user.role.toLowerCase().replace('_', ' ')}
          </span>
        </div>
      </div>
    );
  }

  return avatarContent;
};

// Additional specialized components for document page
export const DocumentCreatorAvatar = ({ user, size = 'sm' }: { user: User; size?: 'xs' | 'sm' | 'md' }) => (
  <UserAvatar
    user={user}
    size={size}
    showBadge
    borderColor={user.department?.colorHex}
    className="ring-1 ring-border"
  />
);

export const DocumentResponsibleAvatar = ({ user, size = 'sm' }: { user: User; size?: 'xs' | 'sm' | 'md' }) => (
  <UserAvatar
    user={user}
    size={size}
    showBadge
    showStatus
    borderColor="#10b981" // Green border for responsible person
    className="ring-2 ring-green-400"
  />
);

export const TaskAssigneeAvatar = ({ user, size = 'sm', isOnline = false }: { user: User; size?: 'xs' | 'sm' | 'md'; isOnline?: boolean }) => (
  <UserAvatar
    user={user}
    size={size}
    showStatus
    showBadge
    isOnline={isOnline}
    borderColor={user.department?.colorHex}
    className="hover:shadow-md transition-shadow"
  />
);

export const UserAvatarWithTooltip = ({ user, size = 'md' }: { user: User; size?: 'xs' | 'sm' | 'md' | 'lg' }) => (
  <div className="group relative">
    <UserAvatar
      user={user}
      size={size}
      showBadge
      showStatus
    />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-[160px]">
      <div className="font-semibold text-center mb-1">
        {user.firstName} {user.lastName}
      </div>
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="text-muted-foreground capitalize">
          {user.role?.toLowerCase().replace('_', ' ')}
        </span>
        {user.department && (
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${user.department.colorHex}15`,
              color: user.department.colorHex,
              border: `1px solid ${user.department.colorHex}30`
            }}
          >
            {user.department.name}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Stacked avatars for multiple users (e.g., document collaborators)
interface UserAvatarStackProps {
  users: User[];
  limit?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const UserAvatarStack = ({
  users,
  limit = 3,
  size = 'sm',
  className
}: UserAvatarStackProps) => {
  const displayUsers = users.slice(0, limit);
  const remainingCount = users.length - limit;

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex -space-x-2">
        {displayUsers.map((user, index) => (
          <div
            key={user.id}
            style={{ zIndex: displayUsers.length - index }}
            className="hover:z-10 transition-transform hover:scale-110"
          >
            <UserAvatar
              user={user}
              size={size}
              className="ring-2 ring-background"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              'rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground font-medium',
              sizeClasses[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};