import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-past-week-shifts',
  templateUrl: './past-week-shifts.component.html',
  styleUrls: ['./past-week-shifts.component.css'],
})
export class PastWeekShiftsComponent implements OnInit {
  message = '';
  shifts: Shift[] = [];
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    try {
      const email = this.authService.getCurrentUser()?.email;
      const upComingShiftsData = await this.firestoreService.getPastWeekShifts(
        email!,
        new Date()
      );
      upComingShiftsData.forEach((shiftData) => {
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
      if (upComingShiftsData.size == 0) {
        this.message = 'There are no shifts in the last 7 days.';
      }
    } catch (err) {
      console.error(err);
      alert('An error has occured.');
    }
  }
}
