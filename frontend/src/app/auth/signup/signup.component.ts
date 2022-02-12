import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/core/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../shared/shared.scss']
})
export class SignupComponent {
  isSigningUp = false;
  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) {
  }

  submitSignUpForm(form: NgForm) {
    if (this.isSigningUp || form.invalid) return;
    this.isSigningUp = true;
    this.authService
      .signUp(this.model)
      .subscribe({
          complete: () => this.router.navigateByUrl('/'),
          error: (err) => this.errorHandlerService.displayError(
            err,
            'An error occurred while signing up. Please try again.'
          )
        }
      )
      .add(() => {
        this.isSigningUp = false;
      });
  }
}
