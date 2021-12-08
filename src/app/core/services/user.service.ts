import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, } from 'rxjs';

import { ApiService, JwtService } from '.';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Credentials } from '../models';
import { AuthType } from '../models/enum';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
  ) {}

  get currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  }

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Verify JWT in localStorage and load user's info.
   * This runs once on application start
   */
  populate(): void {
    if (this.jwtService.getToken()) {
      const that = this;

      this.apiService.get('/user')
        .subscribe({
          next(data) {
            that.resolveAuth(data.user);
          },
          error(msg) {
            that.rejectAuth();
          }
        });

    } else {
      this.rejectAuth();
    }
  }

  resolveAuth(user: User): void {
    // Save JWT
    this.jwtService.saveToken(user.token);
    // Set current user into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  rejectAuth(): void {
    // Remove JWT
    this.jwtService.destroyToken();
    // Empty current user into observable
    this.currentUserSubject.next({} as User);
    // Set isAuthenticated to false
    this.isAuthenticatedSubject.next(false);
  }

  tryAuth(type: string, credentials: Credentials): Observable<User> {
    const route = (type === AuthType.LOGIN) ? '/login' : '';

    return this.apiService.post('/user', { user: credentials })
      .pipe(map(
        data => {
          this.resolveAuth(data.user)
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user: User): Observable<User> {
    return this.apiService.put('/user', { user })
      .pipe(map(
        data => {
          this.currentUserSubject.next(data.user);
          return data;
        }
      ));
  }
}
