import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalEditPageRoutingModule } from './cal-edit-routing.module';

import { CalEditPage } from './cal-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalEditPageRoutingModule
  ],
  declarations: [CalEditPage]
})
export class CalEditPageModule {}
