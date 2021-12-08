import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';

import {
  ApiService,
  ArticleService,
  CommentService,
  JwtService,
  ProfileService,
  TagService,
  UserService,
} from './services';

import { AuthGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    ArticleService,
    AuthGuard,
    CommentService,
    JwtService,
    ProfileService,
    TagService,
    UserService,
  ],
  declarations: []
})
export class CoreModule {}
