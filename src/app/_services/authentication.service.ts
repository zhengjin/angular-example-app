import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Login, SignUp, Tokens} from "../_interfaces/auth.interface";

interface SignedUp {
  id: number;
  status: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(params: Login): Observable<Tokens> {
    // return this.http.post<Tokens>('/auth/login', params);
    return of({
      accessToken: '111111',
      refresh_token: '2222222',
      expires_in: 3600
    });
  }

  signUp(signUpParams: SignUp): Observable<SignedUp> {
    return this.http.post<SignedUp>('/auth/sign-up', signUpParams);
  }
}