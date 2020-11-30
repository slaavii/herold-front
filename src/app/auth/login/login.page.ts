import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from  "@angular/router";
import { first } from 'rxjs/operators';
import { error } from 'protractor';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm;
  invalid;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4),
              Validators.maxLength(11), Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ,.!@%-+=]*$')]]
      })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(){
    this.authenticationService.login(this.username.value, this.password.value)
    .pipe(first())
    .subscribe(
      data =>{
        this.router.navigateByUrl('home');
      },
      error => {
        this.invalid = true;
      });
  }
}
