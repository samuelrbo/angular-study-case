import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '.';
import { Article, ArticleListFilter, ArticleSearchRespose } from '@core/models';
import { ArticleType } from '@core/models/enum';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
  constructor(
    private apiService: ApiService,
  ) {}

  search(filter: ArticleListFilter | any): Observable<ArticleSearchRespose> {
    const params: any = {};

    Object.keys(filter.filters)
      .forEach((key) => {
        params[key] = filter.filters[key];
      });

    const endpoint = `/articles${ filter.type === ArticleType.FEED ? '/feed' : '' }`;
    const queryParams = new HttpParams({ fromObject: params });

    return this.apiService.get<Article[]>(`${endpoint}`, queryParams);
  }

  get(articleSlug: string): Observable<Article> {
    return this.apiService.get<Article>(`/articles/${articleSlug}`)
      .pipe(map(data => data.article));
  }

  save(article: Article): Observable<Article> {
    if (article.slug) { // Update
      return this.apiService.put<Article, Article>(`/articles/${article.slug}`, article)
        .pipe(map(data => data.article));
    }

    return this.apiService.post<Article, Article>(`/articles`, article)
      .pipe(map(data => data.article));
  }

  favorite(articleSlug: string): Observable<Article> {
    return this.apiService.post<any, Article>(`/articles/${articleSlug}/favorite`, {});
  }

  unfavorite(articleSlug: string): Observable<Article> {
    return this.apiService.delete(`/articles/${articleSlug}/favorite`);
  }

  detroy(articleSlug: string) {
    return this.apiService.delete(`/articles/${articleSlug}`);
  }
}
