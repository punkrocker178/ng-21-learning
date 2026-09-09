import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-box',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.scss',
})
export class CommentBox {
  public data = input<Comment>();
  deleted = output<number>();

  public deleteComment() {
    this.deleted.emit(this.data()!.id);
  }
}
