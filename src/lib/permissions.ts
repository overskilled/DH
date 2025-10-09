import { Role, User } from './types';

// Permission definitions (all roles capitalized to match Prisma enum)
export const PERMISSIONS = {
  'dossier:create': ['ASSOCIATE', 'SENIOR', 'ADMIN'],
  'dossier:view': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR', 'ADMIN', 'ACCOUNTING'],
  'dossier:edit': ['ASSOCIATE', 'SENIOR', 'ADMIN'],
  'dossier:delete': ['ASSOCIATE', 'ADMIN'],
  'dossier:assign': ['ASSOCIATE', 'SENIOR', 'ADMIN'],

  'case:create': ['ASSOCIATE', 'SENIOR', 'ADMIN'],
  'case:view': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR', 'ADMIN', 'ACCOUNTING'],
  'case:edit': ['ASSOCIATE', 'SENIOR', 'MID', 'ADMIN'],
  'case:delete': ['ASSOCIATE', 'ADMIN'],

  'milestone:create': ['ASSOCIATE', 'SENIOR', 'MID', 'ADMIN'],
  'milestone:edit': ['ASSOCIATE', 'SENIOR', 'MID', 'ADMIN'],
  'milestone:delete': ['ASSOCIATE', 'SENIOR', 'ADMIN'],

  'task:create': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'ADMIN'],
  'task:view': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR', 'ADMIN', 'ACCOUNTING'],
  'task:edit': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'ADMIN'],
  'task:assign': ['ASSOCIATE', 'SENIOR', 'MID', 'ADMIN'],

  'timeentry:create': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR'],
  'timeentry:view': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR', 'ADMIN', 'ACCOUNTING'],
  'timeentry:edit': ['ASSOCIATE', 'SENIOR', 'MID', 'JUNIOR', 'COLLABORATOR', 'ADMIN'],

  'invoice:create': ['ASSOCIATE', 'ADMIN', 'ACCOUNTING'],
  'invoice:view': ['ASSOCIATE', 'SENIOR', 'ADMIN', 'ACCOUNTING'],
  'invoice:edit': ['ASSOCIATE', 'ADMIN', 'ACCOUNTING'],
  'invoice:delete': ['ASSOCIATE', 'ADMIN'],

  'handover:execute': ['ASSOCIATE', 'SENIOR', 'ADMIN'],

  'department:manage': ['ADMIN'],
  'users:manage': ['ADMIN'],
} as const;

export type PermissionAction = keyof typeof PERMISSIONS;

export const hasPermission = (user: User | null, action: PermissionAction): boolean => {
  if (!user) return false;
  const allowedRoles = PERMISSIONS[action] as any;
  return allowedRoles.includes(user.role);
};

export const canViewDossier = (user: User | null, departmentId?: string): boolean => {
  if (!user) return false;
  if (user.role === 'ADMIN' || user.role === 'ASSOCIATE') return true;
  if (!departmentId) return true;
  return user.departmentId === departmentId;
};
