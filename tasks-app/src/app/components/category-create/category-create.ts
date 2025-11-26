import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  imports: [FormsModule],
  templateUrl: './category-create.html',
  styleUrl: './category-create.css',
})
export class CategoryCreateComponent implements AfterViewInit{
  newName: string = '';
  newColor: string = '';

  @Output() create = new EventEmitter<{ name: string; color?: string }>();

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.newName.trim()) {
      this.create.emit({
        name: this.newName.trim(),
        color: this.newColor.trim() || undefined
      });
      this.newName = '';
      this.newColor = '';
      this.nameInput.nativeElement.focus();
    }
  }
}
