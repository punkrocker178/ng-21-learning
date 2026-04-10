import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserAction } from '../../state/actions/user.action';
import { selectUserState } from '../../state/selectors/user.selector';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  email: string = '';
  password: string = '';
  store = inject(Store);

  constructor() {
    this.store.select(selectUserState).pipe(
      takeUntilDestroyed()
    ).subscribe(user => {
      console.log('User state:', user);
    });
  }

  submit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.store.dispatch(UserAction.login({ email: this.email, password: this.password }));
  }
}
