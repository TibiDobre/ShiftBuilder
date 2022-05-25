import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shift } from './data/shift';

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
    return this.firestore.firestore.collection('users').add({
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

  addShift(shift: Shift) {
    return this.firestore.firestore.collection('shifts').add(shift);
  }

  getShiftByName(name: string) {
    return this.firestore.firestore
      .collection('shifts')
      .where('shiftName', '==', name)
      .get();
  }

  getAllShiftsForUser(currentUserEmail: string | undefined) {
    return this.firestore.firestore
      .collection('shifts')
      .where('userEmail', '==', currentUserEmail)
      .get();
  }

  async updateShift(shift: Shift) {
    const data = await this.firestore.firestore
      .collection('shifts')
      .where('shiftName', '==', shift.shiftName)
      .get();
    return data.docs[0].ref.update(shift);
  }

  searchShifts(
    userEmail: string,
    startDate?: Date,
    endDate?: Date,
    shiftPlace?: string
  ) {
    let userShifts = this.firestore.firestore
      .collection('shifts')
      .where('userEmail', '==', userEmail);
    if (startDate) {
      userShifts = userShifts.where('date', '>=', startDate!);
    }
    if (endDate) {
      userShifts = userShifts.where('date', '<=', endDate!);
    }
    if (shiftPlace) {
      userShifts = userShifts.where('workPlace', '==', shiftPlace!);
    }
    return userShifts.get();
  }
}
