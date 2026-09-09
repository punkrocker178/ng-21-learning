import { createActionGroup, props } from '@ngrx/store';

export const CommentAction = createActionGroup({
  source: 'Comments',
  events: {
    'Comment': props<{ content: string }>(),
    'Comment Success': props<{ data: string }>(),
    'Comment Failure': props<{ error: string }>(),
    'Remove': props<{ id: string }>(),
  },
});
