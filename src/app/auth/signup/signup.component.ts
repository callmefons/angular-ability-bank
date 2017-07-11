import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {storage} from "../../shared/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  auth$: Observable<any>;
  sub: Subscription;
  resStatus: any;
  failedState:boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.failedState = false;
  }

  private buildForm() {
    this.signupForm = this._fb.group(({
      email: [null, Validators.required],
      password: [null, Validators.required],
      given_name: [null, Validators.required],
      family_name: [null, Validators.required],
      username: [null, Validators.required]
    }));
  }

  submitForm() {
    this.failedState = false;
    const user = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.given_name,
      this.signupForm.value.family_name,
      this.signupForm.value.username
    );
    this.auth$ = this._authService.signup(user);
    this.sub = this.auth$.subscribe((res: any) => {
      if (res.status === 201) {
        const data = res.json();
        $('#createdModal').modal('toggle');
      }
      this.resStatus = res.statusText;
    }, err => {
      this.failedState = true;
      this.resStatus = err.message;
    });
  }

  reload() {
    this.ngOnInit();
    window.location.reload();
  }

}
