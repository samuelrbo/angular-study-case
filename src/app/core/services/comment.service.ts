import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '.';
import { Comment } from '@core/models';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentService {
  constructor(
    private apiService: ApiService,
  ) {}

  add(articleSlug: string, comment: Comment): Observable<Comment> {
    const payload = { comment: { body: comment } };

    return this.apiService.post<any, Comment>(`/articles/${articleSlug}/comments`, payload)
      .pipe(map(data => data.comment));
  }

  getAll(articleSlug: string): Observable<Comment[]> {
    return this.apiService.get<Comment[]>(`/articles/${articleSlug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId: number, articleSlug: string) {
    return this.apiService
      .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }
}
