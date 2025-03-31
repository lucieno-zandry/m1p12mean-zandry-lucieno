import { Component, input } from '@angular/core';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'success' |
  'outline-primary' | 'outline-secondary' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-success',
  size?: 'sm' | 'lg',
  isLoading?: boolean,
  type: 'button' | 'submit'
}

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

export class ButtonComponent {
  className = input('');
  variant = input<ButtonProps['variant'] | ''>('')
  isLoading = input(false)
  type = input<ButtonProps['type']>('button')
  disabled=input(false)
}
