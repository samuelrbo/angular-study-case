import { Component, Input } from '@angular/core';

import { ArticleService } from '@core/services';
import { Article, ArticleListFilter } from '@core/models';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  @Input() limit!: number;

  @Input()
  set filter(filter: ArticleListFilter) {
    if (filter) {
      this.query = filter;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query!: ArticleListFilter;
  results!: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor(
    private articleService: ArticleService,
  ) {}

  setPageTo(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery(): void {
    const that = this;

    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.search(this.query)
      .subscribe({
        next(data) {
          that.loading = false;
          that.results = data.articles;

          // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
          that.totalPages = Array.from(
            new Array(
              Math.ceil(data.articlesCount / that.limit)
            ),
            (_, index) => index + 1
          );
        }
      });
  }
}
