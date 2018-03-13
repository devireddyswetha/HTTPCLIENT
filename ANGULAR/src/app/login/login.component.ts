import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';
import {AuthService}       from '../services/auth.service';

@Component({selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  public name: string;
  public password: any;
  public userPostData = {
    'name': '',
    'password':''
  };

  ngOnInit() {
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.userPostData.name = this.name;
    this.userPostData.password = this.password;
    console.log(this.userPostData);
    this.authService.getData(this.userPostData);

  }

}
