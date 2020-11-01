import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { AuthenticationService } from './../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
       
    ) { }

    canActivate() : boolean {
        
        for (let item of jwt_decode<any>(localStorage.getItem('token')).role) {
            if(item.authority === 'ROLE_ADMIN') {
                return true; 
             }
        }
        return false;
     }

    // getRole(): any[] {
    //     const obj = jwt_decode(localStorage.getItem('token'));
    //     return obj.role;
    // }
    
    
}