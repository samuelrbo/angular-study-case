import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { NoAuthGuard } from './no-auth.guard';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
