import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectUserState } from './state/selectors/user.selector';
import { AsyncPipe } from '@angular/common';
import { UserAction } from './state/actions/user.action';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-test-app');
  private readonly _router = inject(Router);

  store = inject(Store);
  userState = this.store.select(selectUserState);

  public isLoading = computed(() => !!this._router.currentNavigation());

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    this.store.dispatch(UserAction.signOut());
  }
}
