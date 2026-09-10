import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserAction } from '../actions/user.action';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(UserAction.login),
      switchMap(({ email, password }) =>
        userService.login(email, password).pipe(
          map((user) => UserAction.loginSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserAction.loginFailure({ error: error.error?.message ?? 'Login failed' })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UserAction.signOut),
      switchMap(() =>
        userService.logout().pipe(
          map(() => UserAction.signOutSuccess()),
          catchError(() => of(UserAction.signOutSuccess())),
        ),
      ),
    ),
  { functional: true },
);
