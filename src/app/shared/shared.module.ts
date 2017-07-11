import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthService} from "../services/auth.service";
import {Http, HttpModule} from "@angular/http";
import {AuthGuard} from "../auth/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule, RouterModule, ReactiveFormsModule,
  ],
  declarations: [NavbarComponent],
  exports: [FormsModule, RouterModule, ReactiveFormsModule,
    NavbarComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [HttpModule, AuthService, AuthGuard]
    };
  }
}
