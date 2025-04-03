import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-delete-appointment',
  imports: [ButtonComponent],
  templateUrl: './delete-appointment.component.html',
  styleUrl: './delete-appointment.component.scss'
})
export class DeleteAppointmentComponent {
  onDelete = output();
  onCancel = input<Function>();
  isLoading = input(false);
}