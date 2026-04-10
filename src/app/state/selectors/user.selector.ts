import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user';

export const selectUserState = createFeatureSelector<User>('user');

export const selectUserEmail = createSelector(
  selectUserState,
  (state: User) => state.email
);

export const selectUserName = createSelector(
  selectUserState,
  (state: User) => state.userName
);
