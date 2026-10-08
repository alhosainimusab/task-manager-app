export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export const TASK_STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
export const TASK_PRIORITIES: TaskPriority[] = ['High', 'Medium', 'Low'];

export interface Task {
  id: number;
  title: string;
  description: string;
  /** Stored as 'yyyy-MM-dd' so it round-trips cleanly through <input type="date"> and JSON. */
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}
