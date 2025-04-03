import { Component } from '@angular/core';
import { HelloCardComponent } from '../hello-card/hello-card.component';
import { NearestAppointmentComponent } from '../nearest-appointment/nearest-appointment.component';

@Component({
  selector: 'app-authorized-homepage',
  imports: [HelloCardComponent, NearestAppointmentComponent],
  templateUrl: './authorized-homepage.component.html',
  styleUrl: './authorized-homepage.component.scss'
})
export class AuthorizedHomepageComponent {

}
