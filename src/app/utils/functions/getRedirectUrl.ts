import { User } from "../types/models";

export default function (user: User) {
    switch (user.role) {
        case 'CLIENT':
            return '/dashboard'
    }

    return ''
}