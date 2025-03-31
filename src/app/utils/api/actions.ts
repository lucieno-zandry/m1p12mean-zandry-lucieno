import { Appointment, User } from "../types/models";
import api from "./api"

export const login = (payload: { email?: unknown, password?: unknown }) => {
    return api.post<{ token: string, user: User }>('/auth/login', payload);
}

export const getAuth = () => {
    return api.get<{ user: User }>('/auth/user');
}

export const signup = (payload: { email?: unknown, password?: unknown, name?: unknown, role?: unknown }) => {
    return api.post<{ token: string, user: User }>('/auth/signup', payload);
}

export const getAppointments = () => {
    return api.get<{ appointments: Appointment[] }>('/appointment/my');
}

export const createAppointment = (payload: { date: string | null, notes: string | null, serviceType: string | null}) => {
    return api.post<{ appointment: Appointment }>('/appointment/create', payload);
}