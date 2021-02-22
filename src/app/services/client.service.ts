import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
  })
export class ClientService {

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    deleteClient(id) {
        this.http.delete(`${environment.apiUrl}/client/del/` + id).subscribe();
    }
  
    addClientAsync(client: Client): Observable<Client[]> {
        let username: any = this.authService.currentUserValue;
        client.username = username.user;
        return this.http.post<Client[]>(`${environment.apiUrl}/client/add`, client);
    }

    addClientMultiAsync(clients: Client[]): Observable<Client[]> {
        let username: any = this.authService.currentUserValue;
        clients.forEach(el => {
            el.username = username.user;
        })
        return this.http.post<Client[]>(`${environment.apiUrl}/client/addMulti`, {
            username: username.user,
            clients: clients
        });
    }

    filterClients(clients: Client[], text: string): Client[] {
        return clients.filter(client => {
          return client.clientName.toLowerCase().indexOf(text) !== -1;
        });
    }

    getClientAsync(): Observable<Client[]> {
        let username: any = this.authService.currentUserValue;
        return this.http.get<Client[]>(`${environment.apiUrl}/clients/` + username.user);
    }

}