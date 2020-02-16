import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../Services/data.service';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Contact} from '../../Classes/contact';
import {ApplicationService} from '../../Services/application.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
  animations: [
    trigger('fullInfo', [
      state('open', style({})),
      state('closed', style({height: '0'})),

      transition('closed=>open', [animate('500ms')]),
      transition('open=>closed', [animate('300ms')]),
    ])
  ]
})
export class PhoneBookComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSubscription: Subscription;

  markedContactsIds = [];

  spinnerShow = false;
  markedAll = false;

  dataSource = new MatTableDataSource();
  displayedColumns = ['mark', 'lastName', 'name', 'phone'];

  snackBarOption: object = {
    duration: 3000,
    panelClass: 'blue-centered-snack'
  };

  firstTime = true;
  expandedRow = null;


  constructor(private matSnackBar: MatSnackBar,
              private dataService: DataService,
              private applicationService: ApplicationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refresh();
    // функция для кастомного фильтра
    this.dataSource.filterPredicate = this.startPredicate;
    this.dataSubscription = this.dataService.dataSubject.subscribe(() => {
      this.spinnerShow = false;
      this.dataSource.data = this.dataService.getContactArray();
      if (!this.firstTime) {
        this.matSnackBar.open('Data refreshed', null, this.snackBarOption);
      }
      this.firstTime = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  checkBoxListener(id) {
    if (this.markedContactsIds.includes(id)) {
      this.markedContactsIds.splice(this.markedContactsIds.indexOf(id), 1);
    } else {
      this.markedContactsIds.push(id);
    }
  }

  addContact() {
    this.dataService.setContact(null);
    this.router.navigate(['contact']);
  }

  correctContact() {
    this.dataService.setContact(
      this.dataSource.data
        .find((contact: any) => contact.id == this.markedContactsIds[0]) as Contact
    );
    this.router.navigate(['contact']);
  }

  removeContacts() {
    this.applicationService.removeContacts(this.markedContactsIds/*,
      window.sessionStorage.getItem('phoneBookToken')*/)
      .subscribe(() => {
        this.markedContactsIds = [];
        this.refresh();
      });
  }

  isMarked(id) {
    return this.markedContactsIds.includes(id);
  }

  refresh() {
    this.spinnerShow = true;
    this.applicationService.getAll(/*window.sessionStorage.getItem('phoneBookToken')*/);
  }

  logout() {
    window.sessionStorage.removeItem('phoneBookToken');
    this.router.navigate(['auth']);
  }

  // кастомный метод поиска
  startPredicate(obj, str) {
    return obj.lastName.toLowerCase().startsWith(str) ||
      obj.name.toLowerCase().startsWith(str);
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  stopProp(event: MouseEvent) {
    event.stopPropagation();
  }

  markAll() {
    this.markedContactsIds = [];
    if (!this.markedAll) {
      for (const obj of this.dataSource.data) {
        this.markedContactsIds.push((obj as Contact).id);
      }
    }
    this.markedAll = !this.markedAll;
  }
}
