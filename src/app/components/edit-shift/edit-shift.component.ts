import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css'],
})
export class EditShiftComponent implements OnInit {
  message = '';
  editShiftForm = new FormGroup({
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
    private route: ActivatedRoute,
    private fireStoreService: FirestoreService,
    private authService: AuthService
  ) {}

  get date() {
    return this.editShiftForm.get('date') as FormControl;
  }

  get startTime() {
    return this.editShiftForm.get('startTime') as FormControl;
  }

  get endTime() {
    return this.editShiftForm.get('endTime') as FormControl;
  }

  get hourlyWage() {
    return this.editShiftForm.get('hourlyWage') as FormControl;
  }

  get workPlace() {
    return this.editShiftForm.get('workPlace') as FormControl;
  }

  get shiftName() {
    return this.editShiftForm.get('shiftName') as FormControl;
  }

  get comments() {
    return this.editShiftForm.get('comments') as FormControl;
  }
  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      const shiftName = p['shiftName'];
      const data = await this.fireStoreService.getShiftByName(shiftName);
      const shiftData = data.docs[0].data();
      const date = shiftData['date'].toDate();
      const yearString = date.getFullYear().toString();
      let monthString = (date.getMonth() + 1).toString();
      if (monthString.length == 1) {
        monthString = '0' + monthString;
      }
      let dayString = date.getDate().toString();
      if (dayString.length == 1) {
        dayString = '0' + dayString;
      }
      const dateString = yearString + '-' + monthString + '-' + dayString;
      //date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      this.date.setValue(dateString);
      this.startTime.setValue(shiftData['startTime']);
      this.endTime.setValue(shiftData['endTime']);
      this.hourlyWage.setValue(shiftData['hourlyWage']);
      this.workPlace.setValue(shiftData['workPlace']);
      this.shiftName.setValue(shiftData['shiftName']);
      this.comments.setValue(shiftData['comments']);

      // we will read from Firebase (through firestoreservice) the shift details
    });
  }
  async updateShift() {
    if (this.startTime.value > this.endTime.value) {
      alert('Hey Smarty Pants, start time must be before end time.');
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
      await this.fireStoreService.updateShift(shift);
      this.message = 'Shift was successfully updated.';
    } catch (err) {
      this.message = 'Update shift failed.';
    }
  }
}
