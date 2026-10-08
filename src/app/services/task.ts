import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  /** Single source of truth. Components read it; only this service writes it. */
  private readonly _tasks = signal<Task[]>(this.load());
  readonly tasks = this._tasks.asReadonly();

  getTaskById(id: number): Task | undefined {
    return this._tasks().find((t) => t.id === id);
  }

  nextId(): number {
    return Math.max(0, ...this._tasks().map((t) => t.id)) + 1;
  }

  idExists(id: number, ignoreId?: number): boolean {
    return this._tasks().some((t) => t.id === id && t.id !== ignoreId);
  }

  createTask(task: Task): void {
    this.save([...this._tasks(), task]);
  }

  updateTask(id: number, changes: Partial<Omit<Task, 'id'>>): void {
    this.save(this._tasks().map((t) => (t.id === id ? { ...t, ...changes } : t)));
  }

  deleteTask(id: number): void {
    this.save(this._tasks().filter((t) => t.id !== id));
  }

  private save(tasks: Task[]): void {
    this._tasks.set(tasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage unavailable (private mode / quota): the app still works in memory.
    }
  }

  private load(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
    } catch {
      // Corrupt or inaccessible storage: fall through to the sample data.
    }
    return [
      { id: 1, title: 'Angular', description: 'Implement demo', dueDate: '2026-10-20', status: 'In Progress', priority: 'High' },
      { id: 2, title: 'MongoDB', description: 'Read some advanced topics', dueDate: '2026-10-25', status: 'Pending', priority: 'Medium' },
    ];
  }
}
