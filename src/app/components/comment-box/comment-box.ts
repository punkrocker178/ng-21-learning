import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  imports: [],
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.scss',
})
export class CommentBox {
  public data = input('');
}
