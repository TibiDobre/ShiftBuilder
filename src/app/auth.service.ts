import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { UserProfile } from './data/user.profile';
import { not } from '@angular/compiler/src/output/output_ast';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public afauth: AngularFireAuth,
    public firestoreService: FirestoreService
  ) {
    afauth.authState.subscribe(async (user) => {
      if (user) {
        const data = await firestoreService.getUser(user.email!);
        const profile = data.docs[0].data();

        const email = profile['email'];
        const age = profile['age'];
        const firstname = profile['firstname'];
        const lastname = profile['lastname'];
        const username = profile['username'];

        const profileData = new UserProfile(
          age,
          email,
          firstname,
          lastname,
          username
        );
        localStorage.setItem('currentUser', JSON.stringify(profileData));
        this.authChanged.emit(true);
      } else {
        console.log('User has been logged out');
        localStorage.removeItem('currentUser');
        this.authChanged.emit(false);
      }
    });
  }

  login(email: string, password: string) {
    return this.afauth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afauth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    return this.afauth.signOut();
  }

  getCurrentUser(): UserProfile | undefined {
    const profileString = localStorage.getItem('currentUser');
    if (!profileString) return undefined;
    const profile = JSON.parse(profileString);
    return new UserProfile(
      profile['age'],
      profile['email'],
      profile['firstname'],
      profile['lastname'],
      profile['username']
    );
  }
}
