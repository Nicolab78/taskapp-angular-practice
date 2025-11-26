import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryEditComponent } from '../category-edit/category-edit';

@Component({
  selector: 'app-category-item',
  imports: [CategoryEditComponent],
  templateUrl: './category-item.html',
  styleUrl: './category-item.css',
})
export class CategoryItemComponent {
  @Input() category!: Category;

  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Category>();

  editing = false;

  onRemove() {
    this.remove.emit(this.category.id);
  }

  startEdit() {
    this.editing = true;
  }

  onSave(updatedCategory: Category) {
    this.edit.emit(updatedCategory);
    this.editing = false;
  }

  onCancel() {
    this.editing = false;
  }
}

