import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent }
];