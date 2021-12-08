import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';

import { AuthModule } from './modules';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
