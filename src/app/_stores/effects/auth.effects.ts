import {Injectable} from "@angular/core";
import {throwError} from "rxjs";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as authActions from "../actions/auth.actions";
import {AuthService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import * as userActions from "../actions/user.actions";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LoginAction),
    switchMap(action => this.authService.login(action.params).pipe(
      tap(tokens => {
        localStorage.setItem('accessToken', tokens.accessToken);
        this.router.navigateByUrl('/home').then()
      }),
      map(() => userActions.GetProfile()),
      catchError(error => throwError(() => error))
    ))
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.SignUpAction),
    mergeMap(action => this.authService.signUp(action.params).pipe(
      tap(res => (!!res.id && this.router.navigateByUrl('/login'))),
      catchError(error => throwError(() => error))
    ))
  ), { dispatch: false });
}
