import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { TaskListComponent } from '../task-list/task-list';
import { TaskCreateComponent } from '../task-create/task-create';
import { Task } from '../../models/Task'; 

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskListComponent, TaskCreateComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent {

  constructor( public taskService: TaskService) {}

  ngOnInit() {

    this.taskService.fetch();
  }

  onCreateTask(data: { title: string; note?: string }) {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      done: false,
      note: data.note,
      created_at: new Date().toISOString()
    };
    this.taskService.create(newTask);
  }


}
