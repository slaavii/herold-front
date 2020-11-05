import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cal-edit',
  templateUrl: './cal-edit.page.html',
  styleUrls: ['./cal-edit.page.scss'],
})
export class CalEditPage implements OnInit {

  event = {
    id: '',
    title: '',
    desc: '',
    note: '',
    startTime: null,
    endTime: null
  };

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private messService: MessageService) { }
 
  save() {    
    this.modalCtrl.dismiss({event: this.event});
  }
 
  close() {
    this.modalCtrl.dismiss();
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Czy napewno usunąć?',
      buttons: [
        {
          text: 'Wyjdź',
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }, {
          text: 'Usuń',
          handler: () => {
            this.messService.deleteMessage(this.event.id).subscribe();
            this.modalCtrl.dismiss();

          }
        }
      ],
    });
    alert.present();
  }

  dateStartChanged(ev) {
    this.event.startTime = new Date(ev.detail.value);
  }

  dateEndChanged(ev) {
    this.event.endTime = new Date(ev.detail.value);
  }

  ngOnInit() {
  }

}
