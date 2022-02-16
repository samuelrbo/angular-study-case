import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ShowAuthedDirective } from '@shared/show-authed.directive';
import {
  ArticleListComponent,
  ArticleMetaComponent,
  ArticlePreviewComponent,
  FavoriteButtonComponent,
  FollowButtonComponent,
  ListErrorsComponent
} from '@shared/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective
  ]
})
export class SharedModule {}
