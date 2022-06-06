import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-up-coming-shift',
  templateUrl: './up-coming-shift.component.html',
  styleUrls: ['./up-coming-shift.component.css'],
})
export class UpComingShiftComponent implements OnInit {
  message = '';
  shifts: Shift[] = [];
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      const email = this.authService.getCurrentUser()?.email;
      const upComingShiftsData = await this.firestoreService.getUpComingShift(
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
        this.message = 'There are no up-coming shifts.';
      }
    } catch {
      alert('An error has occured.');
    }
  }
}
