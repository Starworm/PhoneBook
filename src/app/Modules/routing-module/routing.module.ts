import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from '../../Components/auth/auth.component';
import {PhoneBookComponent} from '../../Components/phone-book/phone-book.component';
import {ContactComponent} from '../../Components/contact/contact.component';
import {PhoneBookGuard} from '../../Guards/phone-book.guard';


const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'auth', component: AuthComponent},
  {
    path: 'phonebook', component: PhoneBookComponent,
    canActivate: [PhoneBookGuard]
  },
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule {
}
