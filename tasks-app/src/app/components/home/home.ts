import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks';
import { CategoriesComponent } from '../categories/categories';
import { ReminderCreateComponent } from '../reminder/reminder-create/reminder-create';
import { ReminderService } from '../../services/reminder';
import { Reminder } from '../../models/Reminder';

@Component({
  selector: 'app-home',
  imports: [TasksComponent, CategoriesComponent, ReminderCreateComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

  constructor(private reminderService: ReminderService) {
  }

  ngOnInit() {
    this.reminderService.fetch();
  }

  get reminders() {
    return this.reminderService.reminders;
  }

  onReminderCreate(data: Omit<Reminder, 'id'>) {
    this.reminderService.create({
      id: Date.now(),
      ...data
    });
  }

  onReminderDelete(id: number) {
    this.reminderService.delete(id);
  }
}
