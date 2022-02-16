import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListFilter } from '@core/models';
import { TagService, UserService } from '@core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;
  listFilter: ArticleListFilter = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  constructor(
    private router: Router,
    private tagService: TagService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.tagService.getAll().subscribe(
      (tags) => {
        this.tags = tags;
        this.tagsLoaded = true;
      }
    );
  }

  setListTo(type: string = '', filters: Object = {}): void {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listFilter = {type, filters};
  }

}
