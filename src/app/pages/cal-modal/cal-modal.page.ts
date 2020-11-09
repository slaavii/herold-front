import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
 
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
  
})
export class CalModalPage implements OnInit {

  ionicForm: FormGroup;
  selectedDate;
                           
  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      desc: ['Uprzejmie informujemy o zarezerwowanej wizycie', 
             [Validators.required, Validators.minLength(2),
              Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ ]*$')]],
      note: ['', [Validators.required, Validators.minLength(2), 
                  Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ,.!@%-+= ]*$')]],
      start: [this.selectedDate, [Validators.required]],
      end: [this.selectedDate, [Validators.required]]
    });
  }

  get title() {
    return this.ionicForm.get('title');
  }

  get desc() {
    return this.ionicForm.get('desc');
  }
  
  get note() {
    return this.ionicForm.get('note');
  }

  get startTime() {
    return this.ionicForm.get('start');
  }

  get endTime() {
    return this.ionicForm.get('end');
  }
  save() {    
    if(this.ionicForm.valid) {
        this.modalCtrl.dismiss({
          event: {
            title: this.title.value,
            desc: this.desc.value,
            startTime: new Date(Date.parse(this.startTime.value)),
            endTime: new Date(Date.parse(this.endTime.value)),
            note: this.note.value }
        });
    }
  }
  
  close() {
    this.modalCtrl.dismiss();
  }
}