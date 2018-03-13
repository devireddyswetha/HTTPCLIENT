import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
const apiUrl = 'http://localhost:3000/createData';
const getapiUrl = 'http://localhost:3000/getData';
@Injectable()
export class AuthService {

  constructor(public http : Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials) {
    console.log('signup', credentials);

      let headers = new Headers();
      return this
        .http
        .post(apiUrl , credentials, {headers: headers});


  }

  getData(credentials) {
    console.log('login', credentials);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this
        .http
        .post(getapiUrl , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }


}
