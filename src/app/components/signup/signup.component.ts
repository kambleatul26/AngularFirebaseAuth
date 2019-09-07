import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
    this.router.navigate(['/login']);
  }

  signUp(signupDetails) {
    this.auth.SignUp(signupDetails.email, signupDetails.password);
  }

  ngOnInit() {
    this.formError = null;
  }

}
