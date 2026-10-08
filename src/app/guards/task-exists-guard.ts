import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TaskService } from '../services/task';

/** Blocks /update/:id when no task has that id and redirects to the list. */
export const taskExistsGuard: CanActivateFn = (route) => {
  const tasks = inject(TaskService);
  const router = inject(Router);
  return tasks.getTaskById(Number(route.paramMap.get('id'))) ? true : router.createUrlTree(['/view']);
};
