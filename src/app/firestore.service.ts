import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  addUser(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    age: number
  ) {
    this.firestore.firestore.collection('users').add({
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname,
      age: age,
    });
  }

  getUser(email: string) {
    return this.firestore.firestore
      .collection('users')
      .where('email', '==', email)
      .get();
  }
}
