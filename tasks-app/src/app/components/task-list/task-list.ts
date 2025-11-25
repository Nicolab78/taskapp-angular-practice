import { Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task';
import { TaskItemComponent } from '../task-item/task-item';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ TaskItemComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements AfterContentInit{

  constructor( public taskService: TaskService) {}
  @Input() lastAddedId: number | null = null;
  @Input() lastEditedId: number | null = null;

  @Output() taskEdited = new EventEmitter<Task>();

  @ContentChild('extra') extraContent!: ElementRef;

  ngAfterContentInit() {
    if(this.extraContent){
       console.log('Contenu projeté', this.extraContent.nativeElement.textContent);

       this.extraContent.nativeElement.style.color = 'blue';
       this.extraContent.nativeElement.style.fontWeight = 'bold';
      
    }
  
  }

}
