import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  SEED_DOSSIERS, 
  SEED_CASES, 
  SEED_MILESTONES, 
  SEED_TASKS, 
  SEED_TIME_ENTRIES, 
  SEED_CLIENTS,
  SEED_INVOICES,
} from '@/lib/seed-data';
import { Dossier, Case, Milestone, Task, TimeEntry, Client, Invoice } from '@/lib/types';

interface StoreState {
  dossiers: Dossier[];
  cases: Case[];
  milestones: Milestone[];
  tasks: Task[];
  timeEntries: TimeEntry[];
  clients: Client[];
  invoices: Invoice[];
  
  // Dossier actions
  getDossierById: (id: string) => Dossier | undefined;
  
  // Case actions
  getCasesByDossierId: (dossierId: string) => Case[];
  getCaseById: (id: string) => Case | undefined;
  
  // Milestone actions
  getMilestonesByCaseId: (caseId: string) => Milestone[];
  
  // Task actions
  getTasksByMilestoneId: (milestoneId: string) => Task[];
  getTaskById: (id: string) => Task | undefined;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateTaskOrder: (milestoneId: string, tasks: Task[]) => void;
  
  // Time entry actions
  getTimeEntriesByTaskId: (taskId: string) => TimeEntry[];
  addTimeEntry: (entry: TimeEntry) => void;
  
  // Client actions
  getClientById: (id: string) => Client | undefined;
  
  // Invoice actions
  getInvoicesByDossierId: (dossierId: string) => Invoice[];
}

export const useStore = create<StoreState>()(
  persist(
    (set: any, get: any) => ({
      dossiers: SEED_DOSSIERS,
      cases: SEED_CASES,
      milestones: SEED_MILESTONES,
      tasks: SEED_TASKS,
      timeEntries: SEED_TIME_ENTRIES,
      clients: SEED_CLIENTS,
      invoices: SEED_INVOICES,

      getDossierById: (id: string) => get().dossiers.find((d: any) => d.id === id),
      
      getCasesByDossierId: (dossierId: string) => get().cases.filter((c: any) => c.dossierId === dossierId),
      getCaseById: (id: string) => get().cases.find((c: any) => c.id === id),
      
      getMilestonesByCaseId: (caseId: string) => get().milestones.filter((m:  any) => m.caseId === caseId).sort((a: any, b: any) => a.order - b.order),
      
      getTasksByMilestoneId: (milestoneId: string) => get().tasks.filter((t: any) => t.milestoneId === milestoneId).sort((a: any, b: any) => a.order - b.order),
      getTaskById: (id: string) => get().tasks.find((t: any) => t.id === id),
      
      updateTask: (id: string, updates: any) => {
        set((state: any) => ({
          tasks: state.tasks.map((t: any) => t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t),
        }));
      },
      
      updateTaskOrder: (milestoneId: string, updatedTasks: any) => {
        set((state: any) => ({
          tasks: state.tasks.map((t: any) => {
            const updatedTask = updatedTasks.find((ut: any) => ut.id === t.id);
            return updatedTask ? updatedTask : t;
          }),
        }));
      },
      
      getTimeEntriesByTaskId: (taskId: any) => get().timeEntries.filter((te: any) => te.taskId === taskId),
      
      addTimeEntry: (entry: any) => {
        set((state: any) => ({
          timeEntries: [...state.timeEntries, entry],
        }));
        
        // Update task spent time
        const task = get().getTaskById(entry.taskId);
        if (task) {
          get().updateTask(entry.taskId, {
            spentTime: task.spentTime + entry.duration,
          });
        }
      },
      
      getClientById: (id: any) => get().clients.find((c: any) => c.id === id),
      
      getInvoicesByDossierId: (dossierId: any) => get().invoices.filter((i: any) => i.dossierId === dossierId),
    }),
    {
      name: 'legal-store',
    }
  )
);
