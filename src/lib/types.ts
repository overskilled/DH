// Core Types for Legal Case Management System

export type DepartmentId = 'corporate' | 'litigation' | 'tax' | 'realestate' | 'ip' | 'employment' | 'criminal';

export type Role = 'partner' | 'senior' | 'mid' | 'junior' | 'collaborator' | 'admin' | 'accounting';

export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export type DossierStatus = 'active' | 'pending' | 'completed' | 'archived';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface Department {
  id: DepartmentId;
  name: string;
  colorHex: string;
  description: string;
}



export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "ASSOCIATE" | "SENIOR" | "MID" | "JUNIOR" | "BOARD";
  departmentId: string | null;
  pricingPerHour: number | null;
  createdAt: string;
  updatedAt: string;
  department?: Department | null;
  managedDepartments: Department[];
  assignedTasks: Task[];

  profilePic: string | null;
  notifications: boolean;

}


export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  createdAt: Date;
}

export interface Dossier {
  id: string;
  title: string;
  clientId: string;
  departmentId: DepartmentId;
  status: DossierStatus;
  referentId: string;
  budget: number;
  spent: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  description: string;
}

export interface Case {
  id: string;
  dossierId: string;
  title: string;
  description: string;
  status: DossierStatus;
  budget: number;
  spent: number;
  assignees: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  caseId: string;
  title: string;
  description: string;
  dueDate: Date;
  order: number;
  completed: boolean;
}

export interface Task {
  id: string;
  milestoneId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignees: string[];
  maxTime: number;
  spentTime: number;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  duration: number;
  description: string;
  date: Date;
  pricingPerHour: number;
  invoiced: boolean;
}

export interface Invoice {
  id: string;
  dossierId: string;
  number: string;
  status: InvoiceStatus;
  clientId: string;
  timeEntries: string[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  dueDate: Date;
  paidAt?: Date;
}

export interface Permission {
  action: string;
  roles: Role[];
}

export interface RunningTimer {
  taskId: string;
  startTime: Date;
  description: string;
}
