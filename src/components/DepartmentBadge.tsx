import { Badge } from '@/components/ui/badge';
import { DEPARTMENTS } from '@/lib/seed-data';
import { DepartmentId } from '@/lib/types';

interface DepartmentBadgeProps {
  departmentId: DepartmentId;
  className?: string;
}

export const DepartmentBadge = ({ departmentId, className }: DepartmentBadgeProps) => {
  const department = DEPARTMENTS.find((d: any) => d.id === departmentId);
  
  if (!department) return null;

  return (
    <Badge 
      className={`dept-${departmentId} border font-medium ${className}`}
      variant="outline"
    >
      {department.name}
    </Badge>
  );
};
