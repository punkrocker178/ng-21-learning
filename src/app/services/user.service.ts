import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  login(email: string, password: string): Observable<boolean> {
    console.log('UserService: Logging in with email:', email);
    return of(true);
  }

  logout() {

  }
}
