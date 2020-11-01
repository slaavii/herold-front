import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';

import { CalEditPage } from './cal-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CalEditPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalEditPageRoutingModule {}
