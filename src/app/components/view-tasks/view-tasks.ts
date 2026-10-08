import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { TASK_STATUSES } from '../../models/task.model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { PriorityPipe } from '../../pipes/priority-pipe';
import { Overdue } from '../../directives/overdue';

@Component({
  selector: 'app-view-tasks',
  imports: [FormsModule, RouterLink, DateFormatPipe, PriorityPipe, Overdue],
  templateUrl: './view-tasks.html',
  styleUrl: './view-tasks.css',
})
export class ViewTasks {
  private readonly taskService = inject(TaskService);

  readonly statuses = TASK_STATUSES;
  readonly search = signal('');
  readonly statusFilter = signal('All');

  /** Recomputed automatically whenever tasks, search or statusFilter change. */
  readonly visibleTasks = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return this.taskService
      .tasks()
      .filter((t) => status === 'All' || t.status === status)
      .filter((t) => !term || `${t.title} ${t.description}`.toLowerCase().includes(term))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  });

  readonly total = computed(() => this.taskService.tasks().length);
}
