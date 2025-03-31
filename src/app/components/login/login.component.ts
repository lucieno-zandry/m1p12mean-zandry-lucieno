import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { login } from '../../utils/api/actions';
import getApiValidationMessages from '../../utils/functions/getApiValidationMessages';
import storeToken from '../../utils/functions/storeToken';
import { Auth } from '../../utils/states/auth';
import getRedirectUrl from '../../utils/functions/getRedirectUrl';

type LoginValidationMessages = {
  email?: string,
  password?: string
}

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent],
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  router = inject(Router);

  auth = inject(Auth);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  validationMessages = signal<LoginValidationMessages>({})

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.validationMessages.update(this.getValidationMessages)
    })
  }

  getValidationMessages = () => {
    const errors: LoginValidationMessages = {};
    if (this.email?.hasError('required')) {
      errors['email'] = "The email is required."
    } else if (this.email?.hasError('email')) {
      errors['email'] = "The email format is invalid";
    }

    if (this.password?.hasError('required')) {
      errors['password'] = "The password is required."
    } else if (this.password?.hasError('minLength')) {
      errors['password'] = "The password should contain at least 6 characters";
    }

    return errors;
  }

  state = {
    isLoading: false,
  }

  onSubmit() {
    if (this.validationMessages().email || this.validationMessages().password) return;
    this.state.isLoading = true;

    login(this.loginForm.value)
      .then(response => {
        storeToken(response.token);
        this.auth.setUser(response.user);
        this.router.navigateByUrl(getRedirectUrl(response.user));
      })
      .catch(error => {
        if (error.message) {
          this.validationMessages.update(() => ({ email: error.message }))
        }

        if (error.errors) {
          this.validationMessages.update(() => getApiValidationMessages(error.errors));
        }
      }).finally(() => {
        this.state.isLoading = false;
      })
  }
}
