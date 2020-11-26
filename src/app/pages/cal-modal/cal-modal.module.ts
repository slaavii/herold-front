import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
 
import { CalModalPageRoutingModule } from './cal-modal-routing.module';
 
import { CalModalPage } from './cal-modal.page';
 
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicSelectableModule } from 'ionic-selectable';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CalModalPageRoutingModule,
    NgCalendarModule,
    IonicSelectableModule
  ],
  declarations: [CalModalPage]
})
export class CalModalPageModule {}