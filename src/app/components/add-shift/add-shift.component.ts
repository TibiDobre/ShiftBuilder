import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  constructor(public fireStoreService: FirestoreService) {}

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
      alert('Hey Smarty Pants, start time must be before end time');
      return;
    }
  }

  ngOnInit(): void {}
}
