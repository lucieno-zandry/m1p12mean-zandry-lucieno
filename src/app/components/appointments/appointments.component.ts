import { Component, computed, inject, signal } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { Appointments } from '../../utils/states/appointments';
import appDate from '../../utils/functions/appDate';
import { CreateAppointmentComponent } from "../create-appointment/create-appointment.component";

@Component({
  selector: 'app-appointments',
  imports: [CalendarComponent, CreateAppointmentComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  selectedDate = signal(appDate.config(new Date()));
  appointments = inject(Appointments);
  activeAppointments = computed(() => this.appointments.appointments()?.[this.selectedDate().toISOString()])
  now = new Date();
  selectedDateIsWeekend = computed(() => appDate.dateIsWeekend(this.selectedDate()))

  ngOnInit() {
    this.appointments.refreshAppointments();
  }
}
