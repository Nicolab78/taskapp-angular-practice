import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks';
import { CategoriesComponent } from '../categories/categories';

@Component({
  selector: 'app-home',
  imports: [TasksComponent, CategoriesComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}
