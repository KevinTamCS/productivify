import { createReducer, on } from '@ngrx/store';

import { closeSidenav, openSidenav, toggleSidenav } from 'src/app/core/store/core/core.actions';


export interface CoreState {
  isSidenavOpen: boolean;
}

export const initialState: Readonly<CoreState> = {
  isSidenavOpen: false
};

export const coreReducer = createReducer(
  initialState,
  on(openSidenav, (state) => ({
    ...state,
    isSidenavOpen: true
  })),
  on(closeSidenav, (state) => ({
    ...state,
    isSidenavOpen: false
  })),
  on(toggleSidenav, (state) => ({
    ...state,
    isSidenavOpen: !state.isSidenavOpen
  }))
);
