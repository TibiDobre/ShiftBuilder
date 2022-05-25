import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  message = '';
  editProfileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl(''),

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
    public firestoreService: FirestoreService
  ) {}

  get username() {
    return this.editProfileForm.get('username') as FormControl;
  }

  get email() {
    return this.editProfileForm.get('email') as FormControl;
  }

  get firstname() {
    return this.editProfileForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.editProfileForm.get('lastname') as FormControl;
  }

  get age() {
    return this.editProfileForm.get('age') as FormControl;
  }

  async updateProfile() {
    try {
      const username = this.username.value;
      const email = this.email.value;
      const firstname = this.firstname.value;
      const lastname = this.lastname.value;
      const age = this.age.value;
      await this.firestoreService.updateUser(
        username,
        firstname,
        lastname,
        email,
        age
      );
      this.authService.updateCurrentUser(
        username,
        firstname,
        lastname,
        email,
        age
      );
      this.message = 'Your profile was updated successfully!';
    } catch (err) {
      this.message = 'Profile update failed.';
    }
  }

  ngOnInit(): void {
    const userData = this.authService.getCurrentUser();
    this.username.setValue(userData?.username);
    this.email.setValue(userData?.email);
    this.firstname.setValue(userData?.firstname);
    this.lastname.setValue(userData?.lastname);
    this.age.setValue(userData?.age);
  }
}
