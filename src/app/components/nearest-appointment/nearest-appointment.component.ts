// nearest-appointment.component.ts
import { Component, inject } from '@angular/core';
import { Appointments } from '../../utils/states/appointments';
import { Auth } from '../../utils/states/auth';

@Component({
  selector: 'app-nearest-appointment',
  templateUrl: './nearest-appointment.component.html',
  styleUrls: ['./nearest-appointment.component.scss']
})
export class NearestAppointmentComponent {
  appointments = inject(Appointments);
  auth = inject(Auth);
  error = '';

  ngOnInit(): void {
    this.appointments.refreshNearestAppointment();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  getStatusClass(status: string): string {
    switch(status) {
      case 'PENDING': return 'bg-warning';
      case 'CONFIRMED': return 'bg-success';
      case 'COMPLETED': return 'bg-info';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}