import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { selectIsSidenavOpen } from 'src/app/core/store/core/core.selectors';
import { closeSidenav } from 'src/app/core/store/core/core.actions';


@Component({
  selector: 'shared-mobile-sidenav',
  templateUrl: './mobile-sidenav.component.html'
})
export class MobileSidenavComponent {
  isSidenavOpen$ = this.store.select(selectIsSidenavOpen);

  constructor(
    private store: Store<AppState>
  ) {
  }

  closeSidenav() {
    this.store.dispatch(closeSidenav());
  }
}
