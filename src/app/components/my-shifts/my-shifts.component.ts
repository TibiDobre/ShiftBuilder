import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.css'],
})
export class MyShiftsComponent implements OnInit {
  shifts: Shift[] = [];
  startDate?: Date = undefined;
  endDate?: Date = undefined;
  shiftPlace: string = '';
  message: string = '';
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const currentUserEmail = this.authService.getCurrentUser()?.email;
      const data = await this.firestoreService.getAllShiftsForUser(
        currentUserEmail
      );

      data.forEach((shiftData) => {
        const shift: Shift = {
          date: shiftData.data()['date'].toDate().toLocaleDateString(),
          startTime: shiftData.data()['startTime'],
          endTime: shiftData.data()['endTime'],
          hourlyWage: shiftData.data()['hourlyWage'],
          workPlace: shiftData.data()['workPlace'],
          shiftName: shiftData.data()['shiftName'],
          comments: shiftData.data()['comments'],
          userEmail: shiftData.data()['userEmail'],
        };
        this.shifts.push(shift);
      });
      if (data.size == 0) {
        this.message = 'There are no shifts.';
      }
    } catch {
      alert('An error has occured.');
    }
  }

  encode(text: string) {
    return encodeURIComponent(text);
  }
  async search() {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      alert('Hey Smarty Pants, start date must be before or equal to end date');
    }

    // ...
    const currentUserEmail = this.authService.getCurrentUser()?.email;
    this.shifts = [];
    const data = await this.firestoreService.searchShifts(
      currentUserEmail!,
      this.startDate,
      this.endDate,
      this.shiftPlace
    );

    data.forEach((shiftData) => {
      const shift: Shift = {
        date: shiftData.data()['date'],
        startTime: shiftData.data()['startTime'],
        endTime: shiftData.data()['endTime'],
        hourlyWage: shiftData.data()['hourlyWage'],
        workPlace: shiftData.data()['workPlace'],
        shiftName: shiftData.data()['shiftName'],
        comments: shiftData.data()['comments'],
        userEmail: shiftData.data()['userEmail'],
      };
      this.shifts.push(shift);
    });
    if (data.size == 0) {
      this.message = 'Hey Smarty Pants, there are no results for your search.';
    }
  }
}
