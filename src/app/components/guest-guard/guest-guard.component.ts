import { Component, inject } from '@angular/core';
import { Auth } from '../../utils/states/auth';
import { Router, RouterOutlet } from '@angular/router';
import intended from '../../utils/functions/intended';

@Component({
  selector: 'app-guest-guard',
  imports: [RouterOutlet],
  templateUrl: './guest-guard.component.html',
  styleUrl: './guest-guard.component.scss'
})
export class GuestGuardComponent {
  auth = inject(Auth)
  router = inject(Router);

  ngOnInit() {
    intended.clear();
    
    if (this.auth.user()) {
      intended.setIntended(location.pathname, false);
      this.router.navigateByUrl('/');
    }
  }
}
