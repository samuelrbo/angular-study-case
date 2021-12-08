import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '.';
import { map } from 'rxjs/operators';

@Injectable()
export class TagService {
  constructor(
    private apiService: ApiService,
  ) {}

  getAll(): Observable<string[]> {
    return this.apiService.get<string[]>(`/tags`)
      .pipe(map(data => data.tags));
  }
}
