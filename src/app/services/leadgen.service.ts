import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadgenService {
  private readonly http = inject(HttpClient);


  subscribe(name: string, email: string): Observable<boolean> {
    return of(true);
  }
}
