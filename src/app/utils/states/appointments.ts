import { Injectable, signal } from "@angular/core";
import { Appointment } from "../types/models";
import { getAllAppointments, getAppointments, getAssignedAppointments, nearestAppointment } from "../api/actions";
import appDate from "../functions/appDate";

type AppointmentsState = { [key: string]: Appointment[] | undefined }

@Injectable({ providedIn: 'root' })
export class Appointments {
    appointments = signal<AppointmentsState | null>(null);
    nearestAppointment = signal<Appointment | null | undefined>(undefined);

    refreshNearestAppointment() {
        nearestAppointment()
            .then((response) => {
                this.nearestAppointment.set(response.appointment);
            })
            .catch(() => {
                this.nearestAppointment.set(null);
            })

    }

    refreshAssignedAppointments() {
        getAssignedAppointments()
            .then(response => {
                const appointmentsValue: AppointmentsState = {};

                response.appointments.forEach((appointment) => {
                    const key = appDate.stringToIso(appointment.date);

                    if (appointmentsValue[key]) {
                        appointmentsValue[key].push(appointment);
                    } else {
                        appointmentsValue[key] = [appointment];
                    }
                })

                this.appointments.update(() => appointmentsValue);
            })
    }

    refreshAppointments() {
        getAppointments()
            .then(response => {
                const appointmentsValue: AppointmentsState = {};

                response.appointments.forEach((appointment) => {
                    const key = appDate.stringToIso(appointment.date);

                    if (appointmentsValue[key]) {
                        appointmentsValue[key].push(appointment);
                    } else {
                        appointmentsValue[key] = [appointment];
                    }
                })

                this.appointments.update(() => appointmentsValue);
            })

    }

    refreshAllAppointments() {
        getAllAppointments()
            .then(response => {
                const appointmentsValue: AppointmentsState = {};

                response.appointments.forEach((appointment) => {
                    const key = appDate.stringToIso(appointment.date);

                    if (appointmentsValue[key]) {
                        appointmentsValue[key].push(appointment);
                    } else {
                        appointmentsValue[key] = [appointment];
                    }
                })

                this.appointments.update(() => appointmentsValue);
            })
    }
}