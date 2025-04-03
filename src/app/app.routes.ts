import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuardComponent } from './components/auth-guard/auth-guard.component';
import { GuestGuardComponent } from './components/guest-guard/guest-guard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AuthorizedHomepageComponent } from './components/authorized-homepage/authorized-homepage.component';
import { AccountPendingComponent } from './components/account-pending/account-pending.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '',
    component: AuthGuardComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'pending', component: AccountPendingComponent }
        ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'appointments',
            component: AppointmentsComponent
          },
          {
            path: '',
            component: AuthorizedHomepageComponent
          }
        ]
      }
    ]
  },
  {
    path: "",
    component: GuestGuardComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent },
        ],
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
