import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Shift } from 'src/app/data/shift';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-highest-earnings',
  templateUrl: './highest-earnings.component.html',
  styleUrls: ['./highest-earnings.component.css'],
})
export class HighestEarningsComponent implements OnInit {
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const data = await this.firestoreService.getAllShiftsForUser(
      this.authService.getCurrentUser()?.email
    );
    const shifts: Shift[] = [];
    data.forEach((shiftData) => {
      const shift: Shift = {
        date: new Date(shiftData.data()['date']),
        startTime: shiftData.data()['startTime'],
        endTime: shiftData.data()['endTime'],
        hourlyWage: shiftData.data()['hourlyWage'],
        workPlace: shiftData.data()['workPlace'],
        shiftName: shiftData.data()['shiftName'],
        comments: shiftData.data()['comments'],
        userEmail: shiftData.data()['userEmail'],
      };
      shifts.push(shift);
    });

    // const earningsByMonth: number[] = [];

    // for (let i = 0; i < shifts.length; i++) {
    //   let shift = shifts[i];
    //   let monthKey = this.getMonthKey(shift);
    //   let existingValue = earningsByMonth[monthKey] ?? 0;
    //   earningsByMonth[monthKey] = existingValue + this.getEarnings(shift);
    // }
  }

  getMonthKey(shift: Shift): number {
    let result = shift.date.getFullYear() * 100;
    result = result + shift.date.getMonth() + 1;
    return result;
  }

  getEarnings(shift: Shift): number {
    const duration = shift.endTime - shift.startTime;
    const earnings = duration * shift.hourlyWage;
    return earnings;
  }
}
