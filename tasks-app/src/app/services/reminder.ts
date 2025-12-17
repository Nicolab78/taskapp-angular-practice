import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Reminder } from '../models/Reminder';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private base = 'http://localhost:8000/reminders';
  reminders = signal<Reminder[]>([]);

  constructor(private http: HttpClient) {}

  fetch() {
    this.http.get<Reminder[]>(this.base).subscribe(data =>
      this.reminders.set(data)
    );
  }

  create(reminder: Reminder) {
    this.http.post<Reminder>(this.base, reminder).subscribe(newReminder =>
      this.reminders.update(arr => [...arr, newReminder])
    );
  }

  delete(id: number) {
    this.http.delete(`${this.base}/${id}`).subscribe(() =>
      this.reminders.update(arr => arr.filter(r => r.id !== id))
    );
  }
}