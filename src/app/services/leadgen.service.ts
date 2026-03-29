import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadgenService {
  private readonly http = inject(HttpClient);


  subscribe(data: { name: string, email: string, message?: string }): Observable<boolean> {
    return of(true);
  }
}
