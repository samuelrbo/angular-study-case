import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule, NoAuthGuard, AuthComponent } from '@modules/auth';

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
