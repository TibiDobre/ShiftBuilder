import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afauth: AngularFireAuth) {}

  signUp(email: string, password: string) {
    this.afauth.createUserWithEmailAndPassword(email, password);
  }
}
