import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { TaskListComponent } from '../task-list/task-list';
import { TaskCreateComponent } from '../task-create/task-create';
import { Task } from '../../models/Task'; 
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskListComponent, TaskCreateComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent {

  constructor( public taskService: TaskService, public categoryService: CategoryService) {}

  ngOnInit() {

    this.taskService.fetch();
    this.categoryService.fetch();

  }

  lastAddedId: number | null = null;
  lastEditedId: number | null = null;

  onCreateTask(data: { title: string; note?: string; category_id?: number  }) {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      done: false,
      note: data.note,
      created_at: new Date().toISOString(),
      category_id: data.category_id
    };
    this.taskService.create(newTask);

    this.lastAddedId = newTask.id;

    setTimeout(() => {
      this.lastAddedId = null;
    }, 1000);
  }

  onEditTask(updatedTask: Task) {
  this.taskService.update(updatedTask.id, updatedTask);

  this.lastEditedId = updatedTask.id;
  setTimeout(() => this.lastEditedId = null, 1000);
}


}
