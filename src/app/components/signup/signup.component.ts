import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { Auth } from '../../utils/states/auth';
import getApiValidationMessages from '../../utils/functions/getApiValidationMessages';
import storeToken from '../../utils/functions/storeToken';
import { signup } from '../../utils/api/actions';
import getRedirectUrl from '../../utils/functions/getRedirectUrl';

type LoginValidationMessages = {
  email?: string,
  password?: string,
  name?: string,
  role?: string,
}

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent],
})

export class SignupComponent {
  roles = ['CLIENT', 'MECHANIC', 'MANAGER'];

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    role: new FormControl('CLIENT', [
      Validators.required,
      Validators.pattern(this.roles.join('|'))
    ])
  });

  router = inject(Router);

  auth = inject(Auth);

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get role() {
    return this.signupForm.get('role');
  }

  validationMessages = signal<LoginValidationMessages>({})

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(() => {
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

    if (this.name?.hasError('required')) {
      errors['name'] = "The name is required."
    } else if (this.password?.hasError('minLength')) {
      errors['name'] = "The name should contain at least 2 characters";
    }

    if (this.name?.hasError('required')) {
      errors['role'] = "The role is required."
    } else if (this.password?.hasError('minLength')) {
      errors['role'] = `The role should be one of the following : ${this.roles.join(',')}`;
    }

    return errors;
  }

  state = {
    isLoading: false,
  }

  onSubmit() {
    if (this.validationMessages().email || this.validationMessages().password || this.validationMessages().name) return;
    this.state.isLoading = true;

    signup(this.signupForm.value)
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

