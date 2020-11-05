import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from  "@angular/router";
import { first } from 'rxjs/operators';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  invalid;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    
  }

  login(form){
    this.authenticationService.login(form.value.username, form.value.password)
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
