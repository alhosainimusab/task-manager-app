import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { TASK_PRIORITIES, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  readonly priorities = TASK_PRIORITIES;

  id = this.taskService.nextId();
  title = '';
  description = '';
  dueDate = '';
  priority: TaskPriority = 'Medium';

  get idTaken(): boolean {
    return this.taskService.idExists(this.id);
  }

  create(): void {
    if (this.idTaken) return;
    this.taskService.createTask({
      id: this.id,
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: this.dueDate,
      status: 'Pending',
      priority: this.priority,
    });
    this.router.navigate(['/view']);
  }

  reset(form: NgForm): void {
    form.resetForm({ id: this.taskService.nextId(), priority: 'Medium' });
  }
}
