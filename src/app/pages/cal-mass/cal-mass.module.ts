import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalMassPageRoutingModule } from './cal-mass-routing.module';
import { CalMassPage } from './cal-mass.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CalMassPageRoutingModule,
    IonicSelectableModule

  ],
  declarations: [CalMassPage]
})
export class CalMassPageModule {}
