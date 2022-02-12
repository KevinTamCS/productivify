import { createAction } from '@ngrx/store';


export const login = createAction(
  '[Auth] Log In User'
);

export const logout = createAction(
  '[Auth] Log Out User'
);
