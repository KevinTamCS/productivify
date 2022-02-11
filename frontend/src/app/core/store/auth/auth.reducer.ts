import { createReducer, on } from '@ngrx/store';

import { login, logout } from 'src/app/core/store/auth/auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: Readonly<AuthState> = {
  isLoggedIn: false
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    isLoggedIn: true
  })),
  on(logout, (state) => ({
    ...state,
    isLoggedIn: false
  }))
);
