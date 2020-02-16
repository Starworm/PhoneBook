import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLs} from '../Classes/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(authObj) {
    return this.http.post(URLs.urlLogin, authObj);
  }

  register(authObj) {
    return this.http.post(URLs.urlRegister, authObj);
  }
}
