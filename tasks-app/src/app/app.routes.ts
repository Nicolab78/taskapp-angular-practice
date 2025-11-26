import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks';
import { CategoriesComponent } from './components/categories/categories';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'categories', component: CategoriesComponent }
];