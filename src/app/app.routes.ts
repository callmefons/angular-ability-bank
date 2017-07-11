import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ApplicationComponent} from "./application/application.component";
import {AuthGuard} from "./auth/auth.guard";


export const ROUTES: Routes = [
  { path: '',     component: HomeComponent},
  { path: 'apps', component: ApplicationComponent , canActivate: [AuthGuard]}
];
