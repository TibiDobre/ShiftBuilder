import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    private router: Router
  ) {}

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  async login() {
    try {
      const email = this.email.value;
      const password = this.password.value;
      await this.authService.login(email, password);
      this.message = 'Login successful! Redirecting...';
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['']);
      }, 5000);
    } catch (err) {
      this.message = 'Login failed!';
      this.password.setValue('');
      this.password.markAsTouched();
    }
  }

  ngOnInit(): void {}
}
