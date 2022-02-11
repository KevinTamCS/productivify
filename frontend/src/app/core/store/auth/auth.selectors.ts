import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';


export const selectAuthState = createFeatureSelector<Readonly<AuthState>>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);
