import { Component } from '@angular/core';
import { CategoryService } from '../../services/category';
import { CategoryListComponent } from '../category-list/category-list';
import { CategoryCreateComponent } from '../category-create/category-create';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-categories',
  imports: [CategoryListComponent, CategoryCreateComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class CategoriesComponent {

  constructor( public categoryService: CategoryService) {}

  ngOnInit() {

    this.categoryService.fetch();
  }

  lastAddedId: number | null = null;
  lastEditedId: number | null = null;


  onCreateCategory(data: { name: string; color?: string }) {
      const newCategory: Category = {
        id: Date.now(),
        name: data.name,
        color: data.color,
        created_at: new Date().toISOString()
      };
      this.categoryService.create(newCategory);
  
      this.lastAddedId = newCategory.id;
  
      setTimeout(() => {
        this.lastAddedId = null;
      }, 1000);
    }

    onEditCategory(updatedCategory: Category) {
    this.categoryService.update(updatedCategory.id, updatedCategory);
  
    this.lastEditedId = updatedCategory.id;
    setTimeout(() => this.lastEditedId = null, 1000);
  }

}
