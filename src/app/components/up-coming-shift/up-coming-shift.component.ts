import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-up-coming-shift',
  templateUrl: './up-coming-shift.component.html',
  styleUrls: ['./up-coming-shift.component.css'],
})
export class UpComingShiftComponent implements OnInit {
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const email = this.authService.getCurrentUser()?.email;
    const nextShift = await this.firestoreService.getUpComingShift(
      email!,
      new Date()
    );
    let i = 0;
  }
}
