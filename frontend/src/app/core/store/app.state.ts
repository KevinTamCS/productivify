import { AuthState } from 'src/app/core/store/auth/auth.reducer';

export interface AppState {
  auth: Readonly<AuthState>;
}
