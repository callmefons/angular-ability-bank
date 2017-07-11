import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isLoggedIn()) {
      return true;
    }
    return false;
  }

}