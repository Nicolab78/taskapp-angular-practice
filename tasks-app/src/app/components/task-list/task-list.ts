import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ TaskItemComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent {

  constructor( public taskService: TaskService) {}

}
