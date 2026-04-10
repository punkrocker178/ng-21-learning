import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { UserAction } from '../actions/user.action';


export const initialState: User = {
  email: '',
  userName: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserAction.loginSuccess, (state, { email }) => ({
    ...state,
    email,
  })),
  on(UserAction.loginFailure, (state) => ({
    ...state,
  })),
  on(UserAction.signOut, () => initialState),
);
