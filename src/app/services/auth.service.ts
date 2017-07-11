import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {apiUrl} from 'app/shared/cogfig';
import {request} from '../shared/request';
import {Observable} from 'rxjs';
import {storage} from '../shared/storage';

@Injectable()
export class AuthService {

  constructor(private _http: Http,
              private _router: Router) {
  }

  signup(user: any) {
    const body = JSON.stringify(user);
    console.log(body)
    return this._http.post(`${apiUrl}users`, body, {headers: request.getJsonHeaders()})
      .map(res => res)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  login(user: any): Observable<any> {
    console.log(user)
    const body = JSON.stringify(user);
    return this._http.post(`${apiUrl}auth/login`, body, {headers: request.getJsonHeaders()})
      .map(res => res)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  logout() {
    storage.removeAuthToken();
    this._router.navigate(['']);
  }

  checkRole(role: string) {
    return role === storage.getRoleToken();
  }

  isLoggedIn() {
    return !!storage.getAuthToken();
  }
}
