import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const USER_ACTIONS = {
  LOGIN: 'Login',
  SIGN_OUT: 'Sign out',
}

export const UserAction = createActionGroup({
  source: 'Users',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ email: string }>(),
    'Login Failure': props<{ error: string }>(),
    'SignOut': emptyProps(),
  },
});
