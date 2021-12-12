import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router/router';

import { Article, ArticleService, UserService } from '../../../../core';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {

  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private userService: UserService,
  ) {}

  toggleFavorite(): void {
    const that = this;
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        if (!this.article.favorited) {
          return this.articleService.favorite(this.article.slug!)
            .pipe(tap(
              {
                next: () => {
                  that.isSubmitting = false;
                  that.toggle.emit(true);
                },
                error: () => that.isSubmitting = false
              }
            ));
        }
        else {
          return this.articleService.unfavorite(this.article.slug!)
            .pipe(tap(
              {
                next: () => {
                  that.isSubmitting = false;
                  that.toggle.emit(false);
                },
                error: () => that.isSubmitting = false
              }
            ));
        }
      }
    )).subscribe();
  }
}
