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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
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

  ngOnInit() {
  }

}
