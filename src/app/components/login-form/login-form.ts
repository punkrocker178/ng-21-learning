import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserAction } from '../../state/actions/user.action';
import { selectUserError } from '../../state/selectors/user.selector';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  email: string = '';
  password: string = '';
  store = inject(Store);
  error$ = this.store.select(selectUserError);

  submit() {
    this.store.dispatch(UserAction.login({ email: this.email, password: this.password }));
  }
}
