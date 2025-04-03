import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../utils/states/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  auth = inject(Auth);
  isSubmitted = false;
  services = [
    { id: 1, name: 'Oil Change', duration: '30 min', price: '$45' },
    { id: 2, name: 'Tire Rotation', duration: '45 min', price: '$35' },
    { id: 3, name: 'Brake Inspection', duration: '1 hour', price: '$75' },
    { id: 4, name: 'Engine Diagnostics', duration: '1 hour', price: '$120' },
    { id: 5, name: 'Full Vehicle Inspection', duration: '2 hours', price: '$150' }
  ];
  
  testimonials = [
    { 
      id: 1, 
      name: 'John D.', 
      rating: 5, 
      text: 'Amazing service! Fixed my car in record time and at a fair price. Will definitely come back.' 
    },
    { 
      id: 2, 
      name: 'Sarah M.', 
      rating: 5, 
      text: 'The mechanics really know what they\'re doing. Great experience from appointment booking to pickup.' 
    },
    { 
      id: 3, 
      name: 'Mike T.', 
      rating: 4, 
      text: 'Reliable and honest garage. They explained everything clearly and didn\'t try to upsell me on unnecessary services.' 
    }
  ];

}