import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../utils/states/auth';
import workHourValidator from '../../utils/validators/workHourValidator';
import { createAppointment } from '../../utils/api/actions';
import appDate from '../../utils/functions/appDate';
import { Appointments } from '../../utils/states/appointments';
import getApiValidationMessages from '../../utils/functions/getApiValidationMessages';
import { ButtonComponent } from '../button/button.component';

type AppointmentValidationMessages = {
  time?: string
  service?: string
  notes?: string
}

@Component({
  selector: 'app-create-appointment',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  appointmentForm = new FormGroup({
    time: new FormControl('', [Validators.required, workHourValidator()]),
    service: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    notes: new FormControl('')
  });

  selectedDate = input.required<Date>()

  auth = inject(Auth);
  appointments = inject(Appointments);

  get time() {
    return this.appointmentForm.get('time');
  }

  get service() {
    return this.appointmentForm.get('service');
  }

  get notes() {
    return this.appointmentForm.get('notes');
  }

  validationMessages = signal<AppointmentValidationMessages>({})

  ngOnInit() {
    this.appointmentForm.valueChanges.subscribe(() => {
      this.validationMessages.update(this.getValidationMessages)
    })
  }

  getValidationMessages = () => {
    const errors: AppointmentValidationMessages = {};
    if (this.time?.hasError('required')) {
      errors['time'] = "Veuillez préciser l'heure!"
    } else if (this.time?.hasError('workHour')) {
      errors['time'] = "Les heures d'ouvertures sont entre 08:00 et 17:00."
    }

    if (this.service?.hasError('required')) {
      errors['service'] = "The service is required."
    } else if (this.service?.hasError('minLength')) {
      errors['service'] = "The service should contain at least 6 characters";
    }

    return errors;
  }

  state = {
    isLoading: false,
  }

  onSubmit() {
    if (!this.appointmentForm.valid) return;
    this.state.isLoading = true;
    createAppointment({
      date: appDate.toPayloadFormat(this.selectedDate(), this.appointmentForm.value.time!),
      notes: this.appointmentForm.value.notes || '',
      serviceType: this.appointmentForm.value.service!
    })
      .then(() => {
        this.appointments.appointments.update(() => null);
        this.appointments.refreshAppointments();
        document.getElementById('create-appointment-modal-close')?.click();
      })
      .catch(error => {
        if (error.status === 422 && error.errors) {
          this.validationMessages.update(() => getApiValidationMessages(error.errors));
        }
      })
      .finally(() => {
        this.state.isLoading = false;
      })
  }
}
