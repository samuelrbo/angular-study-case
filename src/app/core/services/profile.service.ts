import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '.';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  constructor(
    private apiService: ApiService,
  ) {}

  get(username: string): Observable<Profile> {
    return this.apiService.get<Profile>(`/profiles/${username}`)
      .pipe(map(
        data => data.profile
      ));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post<any, Profile>(`/profiles/${username}/follow`, {});
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete(`/profiles/${username}/follow`);
  }
}
