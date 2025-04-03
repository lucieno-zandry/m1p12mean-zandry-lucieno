
export type User = {
    id: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean,
    name: string,
    role: 'CLIENT' | 'MECHANIC' | 'MANAGER'
}

export type AppointmentStatus = ' PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'

export type Appointment = {
    id: string,
    date: string,
    status: AppointmentStatus,
    serviceType: string,
    notes: string,
    mechanicNotes: string,
    createdAt: string,
    updatedAt: string,
    client?: User,
    clientId: string,
    mechanic?: User,
    mechanicId?: string,
}

