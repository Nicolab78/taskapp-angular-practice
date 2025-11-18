import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private base = 'http://localhost:8000/tasks';
  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  fetch() {
    this.http.get<Task[]>(this.base).subscribe(data => this.tasks.set(data));
  }
  
  create(task: Task) {
    this.http.post<Task>(this.base, task).subscribe(newTask =>
      this.tasks.update(arr => [...arr, newTask])
    );
  }

  update(id: number, task: Task) {
    this.http.put<Task>(`${this.base}/${id}`, task).subscribe(updated =>
      this.tasks.update(arr => arr.map(t => t.id === id ? updated : t))
    );
  }

  delete(id: number) {
    this.http.delete(`${this.base}/${id}`).subscribe(() =>
      this.tasks.update(arr => arr.filter(t => t.id !== id))
    );
  }
}