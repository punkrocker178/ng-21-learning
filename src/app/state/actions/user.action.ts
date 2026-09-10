import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user';

export const USER_ACTIONS = {
  LOGIN: 'Login',
  SIGN_OUT: 'Sign out',
}

export const UserAction = createActionGroup({
  source: 'Users',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'SignOut': emptyProps(),
    'SignOut Success': emptyProps(),
  },
});
