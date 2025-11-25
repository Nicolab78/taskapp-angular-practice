import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreateComponent implements AfterViewInit {
  newTitle: string = '';
  newNote: string = '';

  @Output() create = new EventEmitter<{ title: string; note?: string }>();

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.newTitle.trim()) {
      this.create.emit({
        title: this.newTitle.trim(),
        note: this.newNote.trim() || undefined
      });
      this.newTitle = '';
      this.newNote = '';
      this.titleInput.nativeElement.focus();
    }
  }

}
