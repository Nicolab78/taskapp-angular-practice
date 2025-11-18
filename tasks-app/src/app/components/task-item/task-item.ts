import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskEditComponent } from '../task-edit/task-edit';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TaskEditComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() remove = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();

  editing = false

  onRemove() {
    this.remove.emit(this.task.id);
  }

  onToggle() {
    this.toggle.emit({ ... this.task, done: !this.task.done });
  }

  startEdit() {
    this.editing = true
  }

  onSave(updatedTask: Task) {
    this.edit.emit(updatedTask);
    this.editing = false;
  }

  onCancel() {
    this.editing = false;
  }

}
