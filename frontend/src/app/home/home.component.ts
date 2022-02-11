import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { selectIsLoggedIn } from 'src/app/core/store/auth/auth.selectors';
import { login, logout } from 'src/app/core/store/auth/auth.actions';


@Component({
  selector: 'home-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private store: Store<AppState>
  ) {
  }

  login() {
    console.log('Logging in...');
    this.store.dispatch(login());
  }

  logout() {
    console.log('Logging out...');
    this.store.dispatch(logout());
  }
}
