import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
 
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
  
})
export class CalModalPage {

  selectedDate;
  event = {
    title: '',
    desc: 'Przypomnienie o wizycie',
    note: '',
    startTime: null,
    endTime: null
  };

  constructor(private modalCtrl: ModalController) { }
 
  save() {    
    this.modalCtrl.dismiss({event: this.event});
  }
 
  close() {
    this.modalCtrl.dismiss();
  }

  dateStartChanged(ev) {
    this.event.startTime = new Date(ev.detail.value);
  }

  dateEndChanged(ev) {
    this.event.endTime = new Date(ev.detail.value);
  }
}