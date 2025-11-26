import { Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category';
import { CategoryItemComponent } from '../category-item/category-item';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-list',
  imports: [CategoryItemComponent],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryListComponent implements AfterContentInit{

  constructor( public categoryService: CategoryService){}

  @Input() lastAddedId: number | null = null;
  @Input() lastEditedId: number | null = null;

  @Output() categoryEdited = new EventEmitter<Category>();

  @ContentChild('extra') extraContent!: ElementRef;

  ngAfterContentInit() {
    if(this.extraContent){
       console.log('Contenu projeté', this.extraContent.nativeElement.textContent);

       this.extraContent.nativeElement.style.color = 'blue';
       this.extraContent.nativeElement.style.fontWeight = 'bold';
      
    }
  
  }

}
