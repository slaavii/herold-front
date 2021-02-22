import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Validators} from '@angular/forms';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-cal-mass',
  templateUrl: './cal-mass.page.html',
  styleUrls: ['./cal-mass.page.scss'],
})
export class CalMassPage implements OnInit {

  clients: Client[] = [];
  selectedDate: string;
  csvRecords: any[] = [];
  header = false;
  myForm: FormGroup;
  error = false;

  constructor( 
    private modalCtrl: ModalController,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private ngxCsvParser: NgxCsvParser
    ) {
      this.clientService.getClientAsync().subscribe(client => {
        client.forEach(el => this.clients.push(el))
      })
    }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      sms: ['', [Validators.required]],
      file: ['']
    });
  }

  get client() {
    return this.myForm.get('client');
  }

  get sms() {
    return this.myForm.get('sms');
  }

  saveClients() {
    this.clientService.addClientMultiAsync(this.csvRecords).subscribe();
    this.close();
  }

  save() {  
    var data = new Date(Date.now());
    var parsedSelectedDate = new Date(Date.parse(this.selectedDate));
    parsedSelectedDate.setHours(data.getHours(), data.getMinutes());
    
    this.modalCtrl.dismiss({
      event: {
        telNumbers: this.client.value,
        selectedDate: parsedSelectedDate,
        sms: this.sms.value }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onFileChange($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        this.error = false;
      }, (error: NgxCSVParserError) => {
        if (error) this.error = true;
      });
  }

}
