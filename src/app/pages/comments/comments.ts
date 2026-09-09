import { Component, inject, signal } from '@angular/core';
import { CommentBox } from "../../components/comment-box/comment-box";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectCommentState } from '../../state/selectors/comment.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommentAction } from '../../state/actions/comment.action';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comments',
  imports: [
    CommentBox,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField
],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  store = inject(Store);
  commentsData = toSignal(this.store.select(selectCommentState));

  newCommentContent = signal('');
  commentControl = form(this.newCommentContent);
  
  comment() {
    console.log(this.commentControl().value(), 'dispatching comment');
    this.store.dispatch(CommentAction.comment({ content: this.commentControl().value()}));
    this.commentControl().reset('');
  }
}
