import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { closeSidenav, openSidenav } from 'src/app/core/store/core/core.actions';
import { selectIsLoggedIn } from 'src/app/core/store/auth/auth.selectors';


@Component({
  selector: 'shared-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss']
})
export class NavItemsComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private store: Store<AppState>
  ) {
  }

  openSidenav() {
    this.store.dispatch(openSidenav());
  }

  closeSidenav() {
    this.store.dispatch(closeSidenav());
  }
}
