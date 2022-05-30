import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.router.navigate(['']);
  }
  userProfile?: UserProfile;

  constructor(private authService: AuthService, private router: Router) {
    authService.authChanged.subscribe((loggedIn) => {
      if (loggedIn) {
        this.userProfile = this.authService.getCurrentUser();
      } else {
        this.userProfile = undefined;
      }
    });
  }

  ngOnInit(): void {
    this.userProfile = this.authService.getCurrentUser();
  }
}
