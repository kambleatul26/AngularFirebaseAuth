import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public formError: string = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });

    this.auth.errCast.subscribe(res => {
      this.formError = res;
    });
  }

  navigate() {
    this.router.navigate(['/signup']);
  }

  login(loginDetails) {
    this.auth.SignIn(loginDetails.email, loginDetails.password);
  }

  google() {
    this.auth.signInWithGoogle();
  }

  facebook() {
    this.auth.signInWithFacebook();
  }

  forgot() {
    if (this.loginForm.value.email) {
      this.auth.resetPassword(this.loginForm.value.email);
    }
  }

  ngOnInit() {
    this.formError = null;
  }

}
