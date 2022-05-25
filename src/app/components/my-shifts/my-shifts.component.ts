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
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const currentUserEmail = this.authService.getCurrentUser()?.email;
    const data = await this.firestoreService.getAllShiftsForUser(
      currentUserEmail
    );

    // try {
    //   await this.firestoreService.getAllShiftsForUser(currentUserEmail);
    //   this.message = 'Please find your shifts below.';
    // } catch (err) {
    //   this.message = 'You must log in to see your shifts.';
    // }

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
  }

  encode(text: string) {
    return encodeURIComponent(text);
  }
}
