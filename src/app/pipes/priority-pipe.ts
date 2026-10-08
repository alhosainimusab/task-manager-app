import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../models/task.model';

const ICONS: Record<TaskPriority, string> = { High: '🔴', Medium: '🟡', Low: '🟢' };

/** {{ task.priority | priority }}  ->  "🔴 High" */
@Pipe({ name: 'priority' })
export class PriorityPipe implements PipeTransform {
  transform(value: TaskPriority | string): string {
    return `${ICONS[value as TaskPriority] ?? '⚪'} ${value}`;
  }
}
