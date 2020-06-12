import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitLogin = false;
  submitRegister = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBarRef: MatSnackBar,
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.required, Validators.email,],
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8),],
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get login() { return this.loginForm.controls };
  get register() { return this.registerForm.controls };

  onLogin() {
    this.submitLogin = true;
    // stop here if form is invalid
    if (this.login.invalid) {
      return;
    }

    this.loading = true;
    const userData = {
      username: this.login.username.value,
      password: this.login.password.value
    };
    this.authService.loginServ(userData)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  onRegister() {
    this.submitRegister = true;
    // stop here if form is invalid
    if (this.register.invalid) {
      return;
    }

    this.loading = true;
    const registerData = {
      first_name: this.register.first.value,
      last_name: this.register.last.value,
      email: this.register.email.value,
      username: this.register.username.value,
      password: this.register.password.value,
      password_confirm: this.register.password.value,
    };
    this.authService.registerServ(registerData)
      .subscribe(
        data => {
          this.router.navigate(['/']);
          this.loading = false
        },
        error => {
          // this.alertService.error(error);
          this.snackBarRef.open('Something went wrong! Please review your details.');
          this.loading = false
        }
      );
  }

}
