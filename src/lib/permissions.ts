import { Role, User } from './types';

// Permission definitions
export const PERMISSIONS = {
  'dossier:create': ['partner', 'senior', 'admin'],
  'dossier:view': ['partner', 'senior', 'mid', 'junior', 'collaborator', 'admin', 'accounting'],
  'dossier:edit': ['partner', 'senior', 'admin'],
  'dossier:delete': ['partner', 'admin'],
  'dossier:assign': ['partner', 'senior', 'admin'],
  
  'case:create': ['partner', 'senior', 'admin'],
  'case:view': ['partner', 'senior', 'mid', 'junior', 'collaborator', 'admin', 'accounting'],
  'case:edit': ['partner', 'senior', 'mid', 'admin'],
  'case:delete': ['partner', 'admin'],
  
  'milestone:create': ['partner', 'senior', 'mid', 'admin'],
  'milestone:edit': ['partner', 'senior', 'mid', 'admin'],
  'milestone:delete': ['partner', 'senior', 'admin'],
  
  'task:create': ['partner', 'senior', 'mid', 'junior', 'admin'],
  'task:view': ['partner', 'senior', 'mid', 'junior', 'collaborator', 'admin', 'accounting'],
  'task:edit': ['partner', 'senior', 'mid', 'junior', 'admin'],
  'task:assign': ['partner', 'senior', 'mid', 'admin'],
  
  'timeentry:create': ['partner', 'senior', 'mid', 'junior', 'collaborator'],
  'timeentry:view': ['partner', 'senior', 'mid', 'junior', 'collaborator', 'admin', 'accounting'],
  'timeentry:edit': ['partner', 'senior', 'mid', 'junior', 'collaborator', 'admin'],
  
  'invoice:create': ['partner', 'admin', 'accounting'],
  'invoice:view': ['partner', 'senior', 'admin', 'accounting'],
  'invoice:edit': ['partner', 'admin', 'accounting'],
  'invoice:delete': ['partner', 'admin'],
  
  'handover:execute': ['partner', 'senior', 'admin'],
  
  'department:manage': ['admin'],
  'users:manage': ['admin'],
} as const;

export type PermissionAction = keyof typeof PERMISSIONS;

export const hasPermission = (user: User | null, action: PermissionAction): boolean => {
  if (!user) return false;
  const allowedRoles = PERMISSIONS[action] as readonly Role[];
  return allowedRoles.includes(user.role);
};

export const canViewDossier = (user: User | null, departmentId?: string): boolean => {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'partner') return true;
  if (!departmentId) return true;
  return user.departmentId === departmentId;
};
