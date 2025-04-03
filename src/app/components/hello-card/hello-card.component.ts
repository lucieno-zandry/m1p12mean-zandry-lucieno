import { Component, computed, inject } from '@angular/core';
import { Auth } from '../../utils/states/auth';

@Component({
  selector: 'app-hello-card',
  imports: [],
  templateUrl: './hello-card.component.html',
  styleUrl: './hello-card.component.scss'
})
export class HelloCardComponent {
  auth = inject(Auth);
  name = computed(() => this.auth.user()?.name)
}
