import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


constructor(private http: HttpClient, private authService: AuthenticationService) { }

addMessage(message: Message): Observable<Array<Message>> {
  let username: any = this.authService.currentUserValue;
  message.username = username.user;
  return this.http.post<any>(`${environment.apiUrl}/message/add`, message);
  }   
  
getAllMessages() {
  let username: any = this.authService.currentUserValue;
  return this.http.get<any>(`${environment.apiUrl}/message/` + username.user);
  }

updateMessage(message) {
  return this.http.put<any>(`${environment.apiUrl}/message/update`, message);
  }

deleteMessage(id) {
  return this.http.delete(`${environment.apiUrl}/message/del/` + id);
  }

sendMassSMS(obj: any) {
  let tab = new Array();
  obj.telNumbers.forEach(element => {
    tab.push(element.telNumber);
    });
  return this.http.post<any>(`${environment.apiUrl}/message/sendMass`, {
    username: this.authService.currentUserValue.user,
    date: obj.selectedDate,
    telNumbers: tab,
    sms: obj.sms
    });
  }
}
