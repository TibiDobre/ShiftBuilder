import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserProfile } from 'src/app/data/user.profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logOut() {
    this.authService.logOut();
    this.userProfile = undefined;
  }
  userProfile?: UserProfile;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userProfile = this.authService.getCurrentUser();
  }
}
