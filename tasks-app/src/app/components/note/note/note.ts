import { Component, signal, computed } from '@angular/core';
import { NotesService } from '../../../services/note';
import { Note } from '../../../models/Note';

@Component({
  selector: 'app-notes',
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class NotesComponent {

  filter = signal('');

  filteredNotes = computed(() => {
    const f = this.filter().toLowerCase();
    return this.notesService.notes().filter(n =>
      n.text.toLowerCase().includes(f)
    );
  });

  constructor(public notesService: NotesService) {}

  ngOnInit() {
  this.notesService.fetch();
}

  onCreate(input: HTMLInputElement) {
    const text = input.value.trim();
    if (!text) return;

    this.notesService.create({
      id: Date.now(),
      text,
      createdAt: new Date()
    });

    input.value = '';
  }

  onDelete(id: number) {
    this.notesService.delete(id);
  }
}