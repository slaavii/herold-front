import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
 
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
  
})
export class CalModalPage implements OnInit {
  
  ionicForm: FormGroup;
  clients: Client[];
  selectedDate;
  clientsSubscription: Subscription;
  usernameControl: FormControl;
  telNumberControl: FormControl;
  clientControl: FormControl;
  @ViewChild('clientComponent') clientComponent: IonicSelectableComponent;
                           
  constructor(
    private modalCtrl: ModalController,
    private clientService: ClientService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientControl = this.formBuilder.control('', Validators.required),
    this.usernameControl = this.formBuilder.control('', [Validators.required,
      Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ ]*$')]);
    this.telNumberControl = this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{9}$')]);
    this.ionicForm = this.formBuilder.group({
      client: this.clientControl,
      username: this.usernameControl,
      telNumber: this.telNumberControl,
      desc: ['Uprzejmie informujemy o zarezerwowanej wizycie', 
             [Validators.required, Validators.minLength(2),
              Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ ]*$')]],
      note: ['', [Validators.pattern('^[a-zA-Z0-9_śżźćęąółŚŻŹĆĘĄÓŁ,.!@%-+= ]*$')]],
      start: [this.selectedDate, [Validators.required]],
      end: [this.selectedDate, [Validators.required]]
    });
  }

  get client() {
    return this.ionicForm.get('client');
  }

  get username() {
    return this.ionicForm.get('username');
  }

  get telNumber() {
    return this.ionicForm.get('telNumber');
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
    this.modalCtrl.dismiss({
      event: {
        username: this.client.value.username,
        clientName: this.client.value.clientName,
        title: this.client.value.telNumber,
        desc: this.desc.value,
        startTime: new Date(Date.parse(this.startTime.value)),
        endTime: new Date(Date.parse(this.endTime.value)),
        note: this.note.value }
    });
  }
  
  close() {
    this.modalCtrl.dismiss();
  }

  onDeleteClient(event: {
    component: IonicSelectableComponent,
    item: Client
    }) {
    this.clientService.deleteClient(event.item.id);
    event.component.deleteItem(event.item);
  }

  onSaveClient(event: {
    component: IonicSelectableComponent,
    item: Client
  }) {
    // Fill form.
    // this.usernameControl.setValue(event.item.username);
    this.telNumberControl.setValue(event.item.telNumber);

    // Show form.
    event.component.showAddItemTemplate();
  }

  searchClients(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.clientsSubscription) {
        this.clientsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.clientsSubscription = this.clientService.getClientAsync().subscribe(clients => {
      // Subscription will be closed when unsubscribed manually.
      if (this.clientsSubscription.closed) {
        return;
      }
      event.component.items = this.clientService.filterClients(clients, text);
      event.component.endSearch();
    });
  }

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
    }) {
    if (event.component.hasSearchText) {
      // Clean form.
      this.usernameControl.reset();
      this.telNumberControl.reset();
      this.clientControl.reset();

      this.usernameControl.setValue(event.component.searchText);
      // Show form.
      event.component.showAddItemTemplate();
    }
  }

  onSearchSuccess(event: {
    component: IonicSelectableComponent,
    text: string
    }) {
    // Hide form.
    event.component.hideAddItemTemplate();
  }

  addClient() {
    let client = new Client(
      this.usernameControl.value,
      this.telNumberControl.value
    );
    this.clientComponent.showLoading();
    this.clientService.addClientAsync(client).subscribe(() => {
      this.clientComponent.search(client.clientName);
  
    this.clientsSubscription.add(() => {

      this.clientComponent.hideAddItemTemplate();

        // Clean form.
      // this.usernameControl.reset();
      this.telNumberControl.reset();
      this.clientControl.reset();
      });
    });
  }
}