import { inject } from '@angular/core';
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
          map(() => UserAction.loginSuccess({ email })),
          catchError(() => of(UserAction.loginFailure({ error: 'Login failed' }))),
        ),
      ),
    );
  },
  { functional: true },
);
