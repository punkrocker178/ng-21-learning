import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { selectUserState } from '../../state/selectors/user.selector';
import { UserAction } from '../../state/actions/user.action';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  public userState?: Observable<User>;
  constructor(
    private readonly _router: Router,
    private readonly _store: Store
  ) {
    this.userState = this._store.select(selectUserState);
  }

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    this._store.dispatch(UserAction.signOut());
  }
}
