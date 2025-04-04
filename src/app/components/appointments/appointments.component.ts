import { Component, computed, inject, signal } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { Appointments } from '../../utils/states/appointments';
import appDate from '../../utils/functions/appDate';
import { CreateAppointmentComponent } from "../create-appointment/create-appointment.component";
import { Appointment } from '../../utils/types/models';
import { DeleteAppointmentComponent } from '../delete-appointment/delete-appointment.component';
import { deleteAppointment } from '../../utils/api/actions';
import { Auth } from '../../utils/states/auth';

@Component({
  selector: 'app-appointments',
  imports: [CalendarComponent, CreateAppointmentComponent, DeleteAppointmentComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  selectedDate = signal(appDate.config(new Date()));
  appointments = inject(Appointments);
  activeAppointments = computed(() => this.appointments.appointments()?.[this.selectedDate().toISOString()])
  now = new Date();
  selectedDateIsWeekend = computed(() => appDate.dateIsWeekend(this.selectedDate()))
  editingAppointment = signal<Appointment | null>(null);
  deletingAppointment = signal<Appointment | null>(null);
  auth = inject(Auth);
  getTime = appDate.getTime

  appointmentRefreshAction() {
    if (this.auth.user()!.role === 'MANAGER') return this.appointments.refreshAllAppointments();
    this.appointments.refreshAppointments();
  }

  state = {
    isLoading: false,
  }

  date(datestring: string) {
    return new Date(datestring);
  }

  setEditingAppointment(appointment: Appointment | null) {
    this.editingAppointment.update(() => appointment);
  }

  ngOnInit() {
    this.appointmentRefreshAction();
  }

  onDelete() {
    if (!this.deletingAppointment()) return;
    this.state.isLoading = true;
    deleteAppointment(this.deletingAppointment()!.id)
      .then(() => {
        document.getElementById('appointment-delete-modal-close')?.click();
        this.appointmentRefreshAction();
        this.deletingAppointment.set(null);
      })
      .catch((error) => {
        alert('Impossible to delete appointment : ' + error.message);
      })
      .finally(() => {
        this.state.isLoading = false;
      })
  }
}
