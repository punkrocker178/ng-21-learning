import { createReducer, on } from "@ngrx/store";
import { Comment } from "../../models/comment.model";
import { CommentAction } from "../actions/comment.action";

export const initialState: Comment[] = [];

export const commentReducer = createReducer(
  initialState,
  on(CommentAction.comment, (state, { content } ) => {
    const newId = state.length + 1;
    const updated = [...state, { id: newId, content }];
    console.log('[Comment] updating state', content, newId);
    return updated;
  }),
  on(CommentAction.remove, (state, { id }) => {
    const removeIndex = state.findIndex(comment => comment.id === id);
    const updated = [...state];
    updated.splice(removeIndex, 1);
    return updated;
  }),
);