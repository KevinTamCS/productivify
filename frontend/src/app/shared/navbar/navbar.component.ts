import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { selectIsLoggedIn } from 'src/app/core/store/auth/auth.selectors';
import { openSidenav } from 'src/app/core/store/core/core.actions';


@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private store: Store<AppState>
  ) {
  }

  openSidenav() {
    this.store.dispatch(openSidenav());
  }
}
