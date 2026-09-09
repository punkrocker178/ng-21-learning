import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Comment } from '../../models/comment.model';

export const selectCommentState = createFeatureSelector<Comment[]>('comments');

export const selectComments = createSelector(
  selectCommentState,
  (state: Comment[]) => state
);
