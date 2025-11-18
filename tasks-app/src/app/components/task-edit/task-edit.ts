import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task'

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEditComponent {

  @Input() task!: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  editedTitle: string = '';
  editedNote: string = '';

  ngOnInit() {
    this.editedTitle = this.task.title
    this.editedNote = this.task.note ?? '';
  }

  onSave() {
    if (this.editedTitle.trim()) {
      this.save.emit({
        ...this.task,
        title: this.editedTitle.trim(),
        note: this.editedNote.trim() || undefined  
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
