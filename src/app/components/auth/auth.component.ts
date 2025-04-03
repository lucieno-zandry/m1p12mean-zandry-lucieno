import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../../utils/states/auth';

@Component({
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  selector: 'auth-component',
  imports: [RouterOutlet],
})
export class AuthComponent {
  user = inject(Auth).user();
}
