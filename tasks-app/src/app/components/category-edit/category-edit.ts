import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEditComponent implements OnChanges {
  @Input() category!: Category;
  @Output() save = new EventEmitter<Category>();
  @Output() cancel = new EventEmitter<void>();

  editedName = '';
  editedColor = '';
  editedHighlight = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && changes['category'].currentValue) {
      this.editedName = this.category.name;
      this.editedColor = this.category.color ?? '';
    }
  }

  onSave() {
    const name = this.editedName.trim();
    const color = this.editedColor.trim();

    if (name) {
      this.save.emit({
        ...this.category,
        name,
        color: color || undefined,
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
