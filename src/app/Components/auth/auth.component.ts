import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMatcher} from '../../Classes/error-matcher';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Patterns} from '../../Classes/patterns';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../Services/auth.service';
import {DataService} from '../../Services/data.service';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Services/application.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy, OnInit {

  authObservable: Observable<any>;
  authSubscription: Subscription;


  snackBarOption: object = {
    duration: 3000,
    panelClass: 'blue-centered-snack'
  };

  matcher: ErrorMatcher = new ErrorMatcher();
  spinnerShow = false;

  loginFC: FormControl = new FormControl(''/*, Patterns.emailPattern*/);
  passwordFC: FormControl = new FormControl('', Patterns.passwordPattern);
  authFG: FormGroup = new FormGroup({
    email: this.loginFC,
    password: this.passwordFC
  });

  breakpoint: any;
  buttonColsInit = 3;
  buttonCols: number;

  constructor(private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private applicationService: ApplicationService,
              private dataService: DataService,
              private router: Router) {
  }

  sendAuthInfo(mode) {

    if (this.authFG.invalid) {
      this.matSnackBar.open('Wrong auth data', null, this.snackBarOption);
      return;
    }

    this.spinnerShow = true;

    this.authObservable =
      mode == 'signUp' ?
        this.authService.register(this.authFG.value) :
        this.authService.authenticate(this.authFG.value);
    this.authSubscription = this.authObservable
      .subscribe(
        (res) => {
          window.sessionStorage.setItem('phoneBookToken', res.token);
          this.matSnackBar.open('Access allowed', null, this.snackBarOption);
          this.router.navigate(['phonebook']);
        }
      );
  }

  ngOnInit(): void {
    this.buttonCols = this.buttonColsInit;
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}


