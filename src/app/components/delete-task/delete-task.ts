import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-delete-task',
  imports: [RouterLink, DateFormatPipe],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
})
export class DeleteTask {
  readonly taskService = inject(TaskService);
  readonly message = signal('');

  remove(task: Task): void {
    // Same native confirmation dialog shown in the course screenshots.
    if (!confirm(`Are you sure you want to delete the task: ${task.title}?`)) return;
    this.taskService.deleteTask(task.id);
    this.message.set(`Task "${task.title}" was deleted.`);
  }
}
