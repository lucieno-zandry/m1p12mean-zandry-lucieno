// account-pending.component.ts
import { Component, inject } from '@angular/core';
import { Auth } from '../../utils/states/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-pending',
  templateUrl: './account-pending.component.html',
  styleUrls: ['./account-pending.component.scss'],
  imports: [RouterLink]
})
export class AccountPendingComponent {
  user = inject(Auth).user();
}