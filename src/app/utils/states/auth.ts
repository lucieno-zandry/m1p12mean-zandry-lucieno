import { Injectable, signal } from "@angular/core";
import api from "../api/api";
import { getAuth } from "../api/actions";
import { User } from "../types/models";

@Injectable({ providedIn: 'root' })
export class Auth {
    user = signal<User | null | undefined>(undefined)
    setUser(user: User | null) {
        this.user.update(() => user);
    }
    refreshUser() {
        getAuth()
            .then(response => {
                this.setUser(response.user);
            })
            .catch(() => {
                this.setUser(null);
            })
    }
}