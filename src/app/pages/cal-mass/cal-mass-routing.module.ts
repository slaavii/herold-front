import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalMassPage } from './cal-mass.page';

const routes: Routes = [
  {
    path: '',
    component: CalMassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalMassPageRoutingModule {}
