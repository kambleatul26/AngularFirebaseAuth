import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = null;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.userData.subscribe(res => {
      this.user = res;
    });
  }

}
