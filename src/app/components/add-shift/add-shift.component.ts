import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css'],
})
export class AddShiftComponent implements OnInit {
  message = '';
  AddShiftForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(23),
    ]),
    endTime: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(23),
    ]),
    hourlyWage: new FormControl('', [Validators.required, Validators.min(0)]),
    workPlace: new FormControl('', [Validators.required]),
    shiftName: new FormControl('', [Validators.required]),
    comments: new FormControl(''),
  });
  constructor(
    private fireStoreService: FirestoreService,
    private authService: AuthService
  ) {}

  get date() {
    return this.AddShiftForm.get('date') as FormControl;
  }

  get startTime() {
    return this.AddShiftForm.get('startTime') as FormControl;
  }

  get endTime() {
    return this.AddShiftForm.get('endTime') as FormControl;
  }

  get hourlyWage() {
    return this.AddShiftForm.get('hourlyWage') as FormControl;
  }

  get workPlace() {
    return this.AddShiftForm.get('workPlace') as FormControl;
  }

  get shiftName() {
    return this.AddShiftForm.get('shiftName') as FormControl;
  }

  get comments() {
    return this.AddShiftForm.get('comments') as FormControl;
  }

  async AddShift() {
    if (this.startTime.value > this.endTime.value) {
      alert('Hey Smarty Pants, start time must be before end time.');
      return;
    }
    const existingShifts = await this.fireStoreService.getShiftByName(
      this.shiftName.value
    );
    if (existingShifts.size > 0) {
      alert('Hey Smarty Pants, there is another shift with this name.');
      return;
    }

    const userEmail = this.authService.getCurrentUser()?.email;
    const time = new Date(this.date.value);
    time.setHours(this.startTime.value);
    const shift: Shift = {
      date: time,
      startTime: this.startTime.value,
      endTime: this.endTime.value,
      hourlyWage: this.hourlyWage.value,
      workPlace: this.workPlace.value,
      shiftName: this.shiftName.value,
      comments: this.comments.value,
      userEmail: userEmail,
    } as Shift;

    try {
      await this.fireStoreService.addShift(shift);
      this.message = 'Shift was successfully created.';
    } catch (err) {
      this.message = 'Add shift failed.';
    }
    this.date.setValue('');
    this.startTime.setValue('');
    this.endTime.setValue('');
    this.hourlyWage.setValue('');
    this.workPlace.setValue('');
    this.shiftName.setValue('');
    this.comments.setValue('');

    this.date.markAsUntouched();
    this.startTime.markAsUntouched();
    this.endTime.markAsUntouched();
    this.hourlyWage.markAsUntouched();
    this.workPlace.markAsUntouched();
    this.shiftName.markAsUntouched();
    this.comments.markAsUntouched();
  }

  ngOnInit(): void {}
}
