import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { TASK_PRIORITIES, TASK_STATUSES, Task } from '../../models/task.model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-update-task',
  imports: [FormsModule, RouterLink, DateFormatPipe],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
  readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly statuses = TASK_STATUSES;
  readonly priorities = TASK_PRIORITIES;

  /** A copy of the task being edited, so Cancel leaves the stored task untouched. */
  draft: Task | null = null;

  constructor() {
    // Fires on every /update/:id change, including moving from one task to another.
    this.route.paramMap.subscribe((params) => {
      const task = params.has('id') ? this.taskService.getTaskById(Number(params.get('id'))) : undefined;
      this.draft = task ? { ...task } : null;
    });
  }

  update(): void {
    if (!this.draft) return;
    const { id, ...changes } = this.draft;
    this.taskService.updateTask(id, {
      ...changes,
      title: changes.title.trim(),
      description: changes.description.trim(),
    });
    this.router.navigate(['/view']);
  }

  cancel(): void {
    this.router.navigate(['/update']);
  }
}
