import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return throwError(() => (new Error(error.error)));
  }

  get<TResult>(path: string, params: HttpParams = new HttpParams()): Observable<TResult | any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put<TData, TResult>(path: string, body: TData): Observable<TResult | any> {
    return this.http.put(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post<TData, TResult>(path: string, body: TData): Observable<TResult | any> {
    return this.http.post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
