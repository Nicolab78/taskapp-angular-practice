import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private base = 'http://localhost:8000/notes';
  notes = signal<Note[]>([]);

  constructor(private http: HttpClient) {}

  fetch() {
    this.http.get<Note[]>(this.base).subscribe(data =>
      this.notes.set(data)
    );
  }

  create(note: Note) {
    this.http.post<Note>(this.base, note).subscribe(newNote =>
      this.notes.update(arr => [...arr, newNote])
    );
  }

  update(id: number, note: Note) {
    this.http.put<Note>(`${this.base}/${id}`, note).subscribe(updated =>
      this.notes.update(arr => arr.map(n => n.id === id ? updated : n))
    );
  }

  delete(id: number) {
    this.http.delete(`${this.base}/${id}`).subscribe(() =>
      this.notes.update(arr => arr.filter(n => n.id !== id))
    );
  }
}