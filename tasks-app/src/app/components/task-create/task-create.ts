import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreateComponent {
  newTitle: string = '';
  newNote: string = '';

  @Output() create = new EventEmitter<{ title: string; note?: string }>();

  onSubmit() {
    if (this.newTitle.trim()) {
      this.create.emit({
        title: this.newTitle.trim(),
        note: this.newNote.trim() || undefined
      });
      this.newTitle = '';
      this.newNote = '';
    }
  }

}
