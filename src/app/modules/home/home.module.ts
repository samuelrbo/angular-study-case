import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import {
  HomeRoutingModule,
  HomeAuthResolverService,
  HomeComponent
} from '@modules/home';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeAuthResolverService
  ]
})
export class HomeModule { }
