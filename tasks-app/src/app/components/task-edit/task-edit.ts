import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css', 
})
export class TaskEditComponent implements OnChanges {
  @Input() task!: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  editedTitle = '';
  editedNote = '';
  editedHighlight = false; 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      this.editedTitle = this.task.title;
      this.editedNote = this.task.note ?? '';
    }
  }

  onSave() {
    const title = this.editedTitle.trim();
    const note = this.editedNote.trim();

    if (title) {
      this.save.emit({
        ...this.task,
        title,
        note: note || undefined,
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}