import { Component, inject } from '@angular/core';
import { Auth } from '../../utils/states/auth';
import { AuthorizedHomepageComponent } from '../authorized-homepage/authorized-homepage.component';
import { UnauthorizedHomepageComponent } from '../unauthorized-homepage/unauthorized-homepage.component';

@Component({
  selector: 'app-homepage',
  imports: [AuthorizedHomepageComponent, UnauthorizedHomepageComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  auth = inject(Auth);
}
