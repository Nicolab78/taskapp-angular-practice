import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import type { Reminder } from '../../../models/Reminder';

@Component({
  selector: 'app-reminder-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reminder-create.html',
  styleUrl: './reminder-create.css'
})
export class ReminderCreateComponent {

  @Output() create = new EventEmitter<Omit<Reminder, 'id'>>();

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    message: new FormControl('')
  });

  onSubmit() {
    if (this.form.valid) {
      this.create.emit(this.form.value as Omit<Reminder, 'id'>);
      this.form.reset();
    }
  }
}