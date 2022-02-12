import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/core/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/shared.scss']
})
export class LoginComponent {
  isLoggingIn = false;
  model = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) {
  }

  submitLogInForm(form: NgForm) {
    if (this.isLoggingIn || !form.valid) return;

    this.isLoggingIn = true;
    this.authService
      .logIn(this.model)
      .subscribe({
        complete: () => this.router.navigateByUrl('/'),
        error: (err) => this.errorHandlerService.displayError(
          err,
          'An error occurred while logging in. Please try again.'
        )
      })
      .add(() => {
        this.isLoggingIn = false;
      });
  }
}
