import { Routes } from '@angular/router';
import { CreateTask } from './components/create-task/create-task';
import { ViewTasks } from './components/view-tasks/view-tasks';
import { UpdateTask } from './components/update-task/update-task';
import { DeleteTask } from './components/delete-task/delete-task';
import { taskExistsGuard } from './guards/task-exists-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'create', component: CreateTask },
  { path: 'view', component: ViewTasks },
  { path: 'update', component: UpdateTask },
  { path: 'update/:id', component: UpdateTask, canActivate: [taskExistsGuard] },
  { path: 'delete', component: DeleteTask },
  { path: '**', redirectTo: 'view' },
];
