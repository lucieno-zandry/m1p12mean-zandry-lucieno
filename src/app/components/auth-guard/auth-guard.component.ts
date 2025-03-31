import { Component, inject, input } from '@angular/core';
import { Auth } from '../../utils/states/auth';
import { Router, RouterOutlet } from '@angular/router';
import intended from '../../utils/functions/intended';

@Component({
  selector: 'app-auth-guard',
  imports: [RouterOutlet],
  templateUrl: './auth-guard.component.html',
  styleUrl: './auth-guard.component.scss'
})
export class AuthGuardComponent {
  auth = inject(Auth)
  router = inject(Router);

  ngOnInit() {
    intended.clear();
    
    if (!this.auth.user()) {
      intended.setIntended(location.pathname, true);
      this.router.navigateByUrl('/auth/login');
    }
  }
}
