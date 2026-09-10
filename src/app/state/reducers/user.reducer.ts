import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { UserAction } from '../actions/user.action';


export const initialState: User = {
  email: '',
  userName: '',
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserAction.loginSuccess, (state, { user }) => ({
    ...state,
    ...user,
    error: '',
  })),
  on(UserAction.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserAction.signOutSuccess, () => initialState),
);
