import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { Auth } from './utils/states/auth';
import { clear, getIntended } from './utils/functions/intended';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  auth = inject(Auth);
  router = inject(Router);

  ngOnInit() {
    this.auth.refreshUser();
  }

  ngDoCheck() {
    const intended = getIntended()
    if (intended && intended.authOnly === !!this.auth.user() && location.pathname !== intended.uri) {
      clear();
      this.router.navigateByUrl(intended.uri);
    }
  }
}
