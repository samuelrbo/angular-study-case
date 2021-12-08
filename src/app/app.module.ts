import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

    ])
  ],
  declarations: [
    AppComponent,
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
