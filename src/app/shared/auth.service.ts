import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  public userValue: any = null;
  private token = new BehaviorSubject<any>(null);
  private errMessage = new BehaviorSubject<any>(null);

  public get tokenValue(): any {
    return this.token.value;
  }

  public get errCast(): any {
    return this.errMessage.asObservable();
  }

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.userData = fireauth.authState;
    this.userData.subscribe(res => {
      this.userValue = res;
      if (this.userValue) {
        console.log(this.userValue);
        this.token.next(this.userValue['ra']);
      }
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        this.errMessage.next(error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    return this.fireauth
      .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('Successfully signed in!');
          console.log(res);
          this.router.navigate(['/profile']);
        })
        .catch(err => {
          console.log('Something is wrong:', err.message);
          this.errMessage.next(err.message);
        });
  }


  /* Sign out */
  SignOut() {
    this.fireauth
    .signOut();
    this.router.navigate(['/login']);
  }

  /* Reset Password */
  resetPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => {
        console.log(error);
        this.errMessage.next(error.message);
      });
  }

  signInWithFacebook() {
    return this.fireauth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
    .then(res => {
      console.log('Successfully Logged in with Facebook!', res);
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
      this.errMessage.next(error.message);
    });
  }

  signInWithGoogle() {
    return this.fireauth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
    .then(res => {
      console.log('Successfully Logged in with Google!', res);
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
      this.errMessage.next(error.message);
    });
  }
}
