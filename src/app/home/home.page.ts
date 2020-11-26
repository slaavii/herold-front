import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';
import { AppComponent } from '../app.component';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { CalEditPage } from '../pages/cal-edit/cal-edit.page';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuth } from '../models/userAuth';
import { Observable, pipe } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  eventSource = [];
  viewTitle: string;
  today: string;
  selectedDate: string;
  user$: Observable<User>;
  
  calendar = {
    mode: 'month',
    noEventsLabel: 'brak wydarzeń',
    currentDate: new Date(),
    allDayLabel: 'A',
    formatHourColumn: 'HH:00',
    autoSelect: true,
    formatDayTitle: 'MMMM, yyyy',
    formatWeekTitle: `MMMM yyyy, 'tydzień' w`
  };
 
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private appComp: AppComponent,
    private messageService: MessageService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.user$ = this.userService.getUser(this.authService.currentUserValue.user);
    this.messageService.getAllMessages().subscribe(message => {
      this.removeEvents();
      message.forEach(element => {
        let event: any = element;
        event.startTime = new Date(Date.parse(element.startTime));
        event.endTime = new Date(Date.parse(element.endTime));
        this.eventSource.push(event);
      })
      this.myCal.loadEvents();
    });
  }
  ngOnInit() {
  
  }
 
  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }

  logout() {
    this.appComp.logout();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }
 
  async onEventSelected(event: { startTime: string | number | Date; endTime: string | number | Date; title: any; note: any; id: any }) {
    this.openCalEdit(event);
  }

  onTimeSelected = (ev: { selectedTime: Date }) => {
    this.today = ev.selectedTime.getDate().toString();
    let aa = ev.selectedTime.setHours(6);
    this.selectedDate = new Date(aa).toISOString();
  }
 
  deleteEvent(id) {
    this.messageService.deleteMessage(id).subscribe();
    this.removeEvents();
    this.messageService.getAllMessages().subscribe();
    this.myCal.loadEvents();
  }

  removeEvents() {
    this.eventSource = [];
  }

  async alarmOutput() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Nieprawidłowa data',
      buttons: ['OK'],
    });
    alert.present();
  }

  isStartAndEndOk(start: Date, end: Date) {
    if(end.getTime() < start.getTime()) {
      this.alarmOutput();
      return false;
    }
    return true;
  }

  isDateFree(date: Date) {
    let flaga = true;
    this.eventSource.forEach(event=>{
      if(event.startTime.getTime() === date.getTime() ||
         date.getTime() > event.startTime.getTime() && date.getTime() < event.endTime.getTime()) {
           flaga = false;
           this.alarmOutput();
         }
    });
    return flaga;
  }

  readOperation = (message) => {
      this.removeEvents();
      message.forEach(element => {
        let event: any = element;
        event.startTime = new Date(Date.parse(element.startTime));
        event.endTime = new Date(Date.parse(element.endTime));
        this.eventSource.push(event);
      })
    }

  async openCalEdit(ev) {
    const modal = await this.modalCtrl.create({
      component: CalEditPage,
      componentProps: {
        event: ev
      },
      cssClass: 'cal-edit',
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event && 
        // this.isDateFree(result.data.event.startTime) &&
        this.isStartAndEndOk(result.data.event.startTime, result.data.event.endTime)) {
        this.messageService.updateMessage(result.data.event).subscribe(message => this.readOperation(message));
        this.myCal.loadEvents();
      }
      else {
        this.messageService.getAllMessages().subscribe(message => this.readOperation(message));
        this.myCal.loadEvents();
      }
    });
  } 

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      componentProps: {
        selectedDate: this.selectedDate
      },
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event && 
        this.isDateFree(result.data.event.startTime) &&
        this.isStartAndEndOk(result.data.event.startTime, result.data.event.endTime)) {
        this.messageService.addMessage(result.data.event).subscribe(message => this.readOperation(message));
        this.myCal.loadEvents();
      }
    });
  }
}