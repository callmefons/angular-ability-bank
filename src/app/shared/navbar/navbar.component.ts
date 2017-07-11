import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {User} from "../models/user.model";
import {AuthService} from "../../services/auth.service";
import {storage} from "../storage";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup;
  auth$: Observable<any>;
  sub: Subscription;
  resStatus: any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this._fb.group(({
      email: [null, Validators.required],
      password: [null, Validators.required]
    }));
  }

  submitForm() {
    const user = new User(
      this.loginForm.value.email,
      this.loginForm.value.password,
      null,
      null,
      null
    );
    this._authService.login(user);
    this.auth$ = this._authService.login(user);
    this.sub = this.auth$.subscribe((res: any) => {
      const data = res.json();
      storage.setAuthToken(data.email);
      this.resStatus = res.statusText;
      this._router.navigate(['/apps']);
    }, err => this.resStatus = err.message);
  }

}
