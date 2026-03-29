import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../../models/post';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _routeData = toSignal(this._activatedRoute.data);

  public blogPostData = computed(() => (this._routeData() as Data)['blogPostData'] as unknown as Post[]);

  ngOnInit() {
    console.log(this.blogPostData());
  }
}
