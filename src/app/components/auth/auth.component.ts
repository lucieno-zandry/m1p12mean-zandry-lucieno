import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  selector: 'auth-component',
  imports: [RouterOutlet],
})
export class AuthComponent {}
