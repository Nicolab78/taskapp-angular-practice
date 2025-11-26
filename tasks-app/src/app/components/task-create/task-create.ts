import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';

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
  selectedCategoryId: number | null = null;

  categories: any;

  @Output() create = new EventEmitter<{ title: string; note?: string; category_id?: number }>();

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.fetch();
    this.categories = this.categoryService.categories();
  }

  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.newTitle.trim()) {
      this.create.emit({
        title: this.newTitle.trim(),
        note: this.newNote.trim() || undefined,
        category_id: this.selectedCategoryId || undefined
      });
      this.newTitle = '';
      this.newNote = '';
      this.selectedCategoryId = null;
      this.titleInput.nativeElement.focus();
    }
  }

}
