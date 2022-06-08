import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserProfile } from 'src/app/data/user.profile';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  user?: UserProfile;
  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
  ngOnInit(): void {}
}
