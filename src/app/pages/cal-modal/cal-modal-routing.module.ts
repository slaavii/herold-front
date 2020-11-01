import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { CalModalPage } from './cal-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CalModalPage,  
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalModalPageRoutingModule {}
