import { Directive, HostBinding, Input } from '@angular/core';
import { TaskStatus } from '../models/task.model';

/** <tr [appOverdue]="task.dueDate" [appOverdueStatus]="task.status"> adds the `overdue` class when late and not completed. */
@Directive({ selector: '[appOverdue]' })
export class Overdue {
  @Input('appOverdue') dueDate = '';
  @Input('appOverdueStatus') status: TaskStatus = 'Pending';

  @HostBinding('class.overdue') get isOverdue(): boolean {
    const today = new Date().toLocaleDateString('en-CA'); // yyyy-MM-dd in local time
    return this.status !== 'Completed' && !!this.dueDate && this.dueDate < today;
  }
}
