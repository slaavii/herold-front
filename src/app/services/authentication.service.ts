import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { UserAuth } from '../models/userAuth';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserAuth>;
    public currentUser: Observable<UserAuth>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('token')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAuth {
        return this.currentUserSubject.value;
    }

   
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}