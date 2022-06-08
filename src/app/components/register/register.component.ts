import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message = '';
  loading = false;
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.max(130),
      Validators.min(6),
    ]),
  });

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    private router: Router
  ) {}

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get firstname() {
    return this.registerForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.registerForm.get('lastname') as FormControl;
  }

  get age() {
    return this.registerForm.get('age') as FormControl;
  }

  async register() {
    try {
      await this.authService.signUp(this.email.value, this.password.value);

      const username = this.username.value;
      const email = this.email.value;
      const firstname = this.firstname.value;
      const lastname = this.lastname.value;
      const age = this.age.value;

      await this.firestoreService.addUser(
        username,
        firstname,
        lastname,
        email,
        age
      );

      this.message = 'Register succesful. Loading your new account...';
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['']);
      }, 3500);
      this.username.setValue('');
      this.email.setValue('');
      this.password.setValue('');
      this.firstname.setValue('');
      this.lastname.setValue('');
      this.age.setValue('');

      this.username.markAsUntouched();
      this.email.markAsUntouched();
      this.password.markAsUntouched();
      this.firstname.markAsUntouched();
      this.lastname.markAsUntouched();
      this.age.markAsUntouched();
    } catch (err) {
      this.message = 'Register failed.';
    }
  }
  ngOnInit(): void {}
}
