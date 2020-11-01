import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// @ts-ignore
import jwt_decode from 'jwt-decode';

import { AuthenticationService } from './../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && !this.isTokenExpired()) {
        // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        this.authenticationService.logout();
        return false;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode<any>(token);
        if (decoded.exp === undefined) return null;
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }

      isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;
    
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }

    
}