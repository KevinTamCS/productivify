import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// Used for logging in
export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpData extends AuthData {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  logIn(data: AuthData) {
    return this.http.post<AuthData>('/auth/login', data);
  }

  logOut() {
    // TODO: Log out endpoint to add JWT to token blocklist
  }

  signUp(data: SignUpData) {
    return this.http.post<SignUpData>('/auth/signup', data);
  }
}
