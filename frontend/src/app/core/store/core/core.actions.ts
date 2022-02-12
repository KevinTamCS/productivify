import { createAction } from '@ngrx/store';


export const openSidenav = createAction(
  '[Core] Open Sidenav'
);

export const closeSidenav = createAction(
  '[Core] Close Sidenav'
);

export const toggleSidenav = createAction(
  '[Core] Toggle Sidenav'
);
