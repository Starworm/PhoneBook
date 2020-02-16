import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLs} from '../Classes/urls';
import {DataService} from './data.service';
import {Contact} from '../Classes/contact';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  snackBarOption: object = {
    duration: 3000,
    panelClass: 'blue-centered-snack'
  };

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     // 'Content-Type': 'application/json'
  //   })
  // };

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getAll(/*token: string*/) {
    // this.setToken(token);
    this.http.get(URLs.urlContacts/*, this.httpOptions*/)
      .subscribe((res: any) => {
          this.dataService.setContactArray(res.contacts);
        }
      );
  }

  addContact(contact: Contact/*, token: string*/): Observable<Contact> {
    // this.setToken(token);
    return this.http.post(URLs.urlAdd, contact/*, this.httpOptions*/) as Observable<Contact>;
  }

  removeContacts(contactsIds: Array<number>/*, token: string*/) {
    // this.setToken(token);
    const requests: Array<Observable<any>> = [];
    contactsIds.forEach((id) => {
      requests.push(this.http.delete(URLs.urlRemove + '/' + id/*, this.httpOptions*/));
    });
    return forkJoin(requests);
  }

  correctContact(contact: Contact/*, token: string*/): Observable<Contact> {
    // this.setToken(token);
    return this.http.put(URLs.urlCorrect, contact/*, this.httpOptions*/) as Observable<Contact>;
  }

  // setToken(token: string) {
  //   this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token);
  //
  // }
}
