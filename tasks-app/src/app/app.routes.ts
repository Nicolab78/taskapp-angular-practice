import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CategoriesComponent } from './components/categories/categories';

export const routes: Routes = [
  { path: '', component: HomeComponent },        
  { path: 'categories', component: CategoriesComponent }
];