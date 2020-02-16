import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './Components/auth/auth.component';
import {PhoneBookComponent} from './Components/phone-book/phone-book.component';
import {ContactComponent} from './Components/contact/contact.component';
import {RoutingModule} from './Modules/routing-module/routing.module';
import {MaterialDesignModule} from './Modules/material-design/material-design.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PhoneBookInterceptor} from './Classes/phone-book-interceptor';
import {MatGridListModule} from '@angular/material';
import {HighlightDirective} from './Directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PhoneBookComponent,
    ContactComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule, RoutingModule,
    HttpClientModule, MaterialDesignModule, MatGridListModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: PhoneBookInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
