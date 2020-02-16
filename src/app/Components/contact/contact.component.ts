import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../Services/data.service';
import {Observable, Subscription} from 'rxjs';
import {Contact} from '../../Classes/contact';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../Classes/patterns';
import {ErrorMatcher} from '../../Classes/error-matcher';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Services/application.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  snackBarOption: object = {
    duration: 3000,
    panelClass: 'blue-centered-snack'
  };

  correctObservable: Observable<Contact>;
  correctSubscription: Subscription;
  contactSubscription: Subscription;
  dataSubscription: Subscription;

  contact: Contact;
  addressFC: FormControl;
  descriptionFC: FormControl;
  emailFC: FormControl;
  lastNameFC: FormControl;
  nameFC: FormControl;

  phoneFC: FormControl;
  contactFG: FormGroup;

  matcher: ErrorMatcher = new ErrorMatcher();
  mode: string;

  // token: string = window.sessionStorage.getItem('phoneBookToken');

  constructor(private dataService: DataService,
              private applicationService: ApplicationService,
              private router: Router) {
  }

  ngOnInit() {
    this.contactSubscription =
      this.dataService.contactSubject.subscribe(() => {
        this.contact = this.dataService.getContact();
        this.mode = this.contact ? 'correct' : 'add';
        if (!this.contact) {
          this.contact = Contact.getEmptyContact();
        }

        this.addressFC =
          new FormControl(this.contact.address, [Validators.required, Patterns.addressPattern]);
        this.descriptionFC =
          new FormControl(this.contact.description);
        this.emailFC =
          new FormControl(this.contact.email, [Validators.required, Patterns.emailPattern]);
        this.lastNameFC =
          new FormControl(this.contact.lastName, [Validators.required, Patterns.namePattern]);
        this.nameFC =
          new FormControl(this.contact.name, [Validators.required, Patterns.namePattern]);
        this.phoneFC =
          new FormControl(this.contact.phone, Patterns.phonePattern);

        this.contactFG = new FormGroup({
            address: this.addressFC,
            description: this.descriptionFC,
            email: this.emailFC,
            lastName: this.lastNameFC,
            name: this.nameFC,
            phone: this.phoneFC
          }
        );
      });
  }

  cancel() {
    this.router.navigate(['phonebook']);
  }

  contactSubmit() {

    if (this.contactFG.invalid) {
      return;
    }

    const contactToSend = this.contactFG.value;
    contactToSend.id = this.mode === 'add' ? 0 : this.contact.id;
    this.correctObservable = this.mode === 'add' ?
      this.applicationService.addContact(contactToSend/*, this.token*/) :
      this.applicationService.correctContact(contactToSend/*, this.token*/);

    this.correctSubscription = this.correctObservable
      .subscribe((res) => {
        console.log(res);
        this.applicationService.getAll(/*this.token*/);
        this.dataSubscription = this.dataService.dataSubject
          .subscribe(() => {
              this.router.navigate(['phonebook']);
            },
            (err) => console.log(err)
          );
      });
  }

  ngOnDestroy() {
    if (this.contactSubscription) {this.contactSubscription.unsubscribe(); }
    if (this.correctSubscription) {this.correctSubscription.unsubscribe(); }
    if (this.dataSubscription) {this.dataSubscription.unsubscribe(); }
  }
}
