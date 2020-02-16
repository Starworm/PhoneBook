import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Contact} from '../Classes/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contactArrayData: Array<Contact> = [];
  contactData: Contact;

  dataSubject: BehaviorSubject<Array<Contact>> = new BehaviorSubject(null);   // объект массива контактов
  contactSubject: BehaviorSubject<any> = new BehaviorSubject(null);           // объект одного контакта

  constructor() { }

  setContactArray(data: Array<Contact>) {
    this.contactArrayData = data;
    this.dataSubject.next(null);
  }

  getContactArray(): Array<Contact> {
    return this.contactArrayData;
  }

  setContact(contact: Contact) {
    this.contactData = contact;
    this.contactSubject.next(null);
  }

  getContact(): Contact {
    return this.contactData;
  }
}
