import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpRetun: any;
  public name: string;
  public password: any;
  public userPostData = {
    'name': '',
    'password':''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  signup() {
      this.userPostData.name = this.name;
      this.userPostData.password = this.password;
       console.log(this.userPostData);
      this.authService.postData(this.userPostData)
        .subscribe((signUpData) => {
          console.log("signupdata" , signUpData.status);

          if(signUpData.status == 200 ){
            this.signUpRetun = "User Register Sucessfully"
          }

        },(err) => {
            console.log(err);
        })

  }



}
