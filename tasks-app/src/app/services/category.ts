import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private base = 'http://localhost:8000/categories';
  categories = signal<Category[]>([]);

  constructor(private http: HttpClient) {}

  fetch() {
      this.http.get<Category[]>(this.base).subscribe(data => this.categories.set(data));
      
    }
    
    create(task: Category) {
      this.http.post<Category>(this.base, task).subscribe(newCat =>
        this.categories.update(arr => [...arr, newCat])
      );
    }
  
    update(id: number, task: Category) {
      this.http.put<Category>(`${this.base}/${id}`, task).subscribe(updated =>
        this.categories.update(arr => arr.map(c => c.id === id ? updated : c))
      );
    }
  
    delete(id: number) {
      this.http.delete(`${this.base}/${id}`).subscribe(() =>
        this.categories.update(arr => arr.filter(c => c.id !== id))
      );
    }
}
