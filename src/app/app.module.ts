import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import {ApplicationComponent} from "./application/application.component";
import {SignupComponent} from "./auth/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
