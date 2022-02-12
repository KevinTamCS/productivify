import { CoreState } from './core/core.reducer';
import { AuthState } from './auth/auth.reducer';


export interface AppState {
  core: Readonly<CoreState>;
  auth: Readonly<AuthState>;
}
