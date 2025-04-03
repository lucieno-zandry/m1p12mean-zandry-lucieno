import { Component } from '@angular/core';
import { HelloCardComponent } from '../hello-card/hello-card.component';

@Component({
  selector: 'app-authorized-homepage',
  imports: [HelloCardComponent],
  templateUrl: './authorized-homepage.component.html',
  styleUrl: './authorized-homepage.component.scss'
})
export class AuthorizedHomepageComponent {

}
