import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../utils/states/auth';
import storeToken from '../../utils/functions/storeToken';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  auth = inject(Auth);
  router = inject(Router);

  logout() {
    document.getElementById('logout-modal-dialog-close')?.click();
    this.auth.setUser(null);
    storeToken(null);
    this.router.navigateByUrl('/auth/login');
  }
}
