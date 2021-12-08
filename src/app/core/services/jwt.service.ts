import { Injectable } from '@angular/core';
import { JWT_TOKEN } from '../constants';

@Injectable()
export class JwtService {
  getToken(): string | null {
    return window.localStorage.getItem(JWT_TOKEN);
  }

  saveToken(token: string): void {
    window.localStorage.setItem(JWT_TOKEN, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(JWT_TOKEN);
  }
}
