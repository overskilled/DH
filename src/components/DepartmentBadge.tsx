import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Department {
  id: string;
  name: string;
  colorHex?: string;
  description?: string;
}

interface DepartmentBadgeProps {
  department?: Department | null;
  departmentId?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'solid';
  showIcon?: boolean;
}

export const DepartmentBadge = ({ 
  department, 
  departmentId, 
  className, 
  size = 'md',
  variant = 'outline',
  showIcon = false
}: DepartmentBadgeProps) => {
  // If no department data is provided, return null
  if (!department && !departmentId) {
    console.warn('DepartmentBadge: Either department or departmentId must be provided');
    return null;
  }

  // You can fetch department data by ID here if needed
  // For now, we'll rely on the department object being passed
  const departmentData = department;

  if (!departmentData) {
    return (
      <Badge 
        variant="outline"
        className={cn(
          "border-dashed bg-muted/50 text-muted-foreground",
          size === 'sm' && "text-xs px-2 py-0.5",
          size === 'md' && "text-sm px-2.5 py-1",
          size === 'lg' && "text-base px-3 py-1.5",
          className
        )}
      >
        No Department
      </Badge>
    );
  }

  const { name, colorHex } = departmentData;

  // Size classes
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 h-5",
    md: "text-sm px-2.5 py-1 h-6",
    lg: "text-base px-3 py-1.5 h-7"
  };

  // Base styles for solid variant with custom colors
  const solidStyles = colorHex ? {
    backgroundColor: colorHex,
    color: getContrastColor(colorHex),
    borderColor: colorHex
  } : {};

  // Base styles for outline variant with custom colors
  const outlineStyles = colorHex ? {
    backgroundColor: `${colorHex}15`,
    color: colorHex,
    borderColor: `${colorHex}30`
  } : {};

  return (
    <Badge 
      variant={variant === 'solid' ? 'default' : 'outline'}
      className={cn(
        "font-medium transition-all duration-200 hover:scale-105",
        "dept-badge",
        sizeClasses[size],
        className
      )}
      style={
        variant === 'solid' 
          ? solidStyles 
          : outlineStyles
      }
    >
      {showIcon && colorHex && (
        <div 
          className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
          style={{ backgroundColor: colorHex }}
        />
      )}
      <span className="truncate max-w-[120px]">{name}</span>
    </Badge>
  );
};

// Helper function to determine text color based on background
function getContrastColor(hexColor: string): string {
  // Remove the # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// Optional: Department Icon component for more visual representation
export const DepartmentIcon = ({ 
  department, 
  size = 'sm',
  className 
}: { 
  department?: Department | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  if (!department?.colorHex) return null;

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div 
      className={cn(
        "rounded-full flex-shrink-0",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: department.colorHex }}
      title={department.name}
    />
  );
};

// Optional: Department with tooltip and more info
export const DepartmentBadgeWithTooltip = ({ 
  department, 
  className,
  showDescription = false 
}: { 
  department?: Department | null;
  className?: string;
  showDescription?: boolean;
}) => {
  if (!department) return null;

  return (
    <div className="group relative">
      <DepartmentBadge 
        department={department} 
        className={className}
        variant="solid"
        showIcon
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-[200px]">
        <div className="font-semibold mb-1">{department.name}</div>
        {showDescription && department.description && (
          <div className="text-muted-foreground text-xs">
            {department.description}
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: department.colorHex }}
          />
          <span className="text-xs text-muted-foreground">
            {department.colorHex}
          </span>
        </div>
      </div>
    </div>
  );
};