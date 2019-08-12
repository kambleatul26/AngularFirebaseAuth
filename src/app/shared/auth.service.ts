import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  userValue: any = null;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = fireauth.authState;
    this.userData.subscribe(res => {
      this.userValue = res;
      console.log(this.userValue);
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.fireauth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.fireauth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        console.log(this.userData);
        this.router.navigate(['/profile']);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.fireauth
      .auth
      .signOut();
    this.router.navigate(['/login']);
  }

  signInWithFacebook() {
    return this.fireauth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
    .then(res => {
      console.log('Successfully Logged in with Facebook!', res);
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }

  signInWithGoogle() {
    return this.fireauth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
    .then(res => {
      console.log('Successfully Logged in with Google!', res);
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }
}
