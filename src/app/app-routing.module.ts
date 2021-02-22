import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'cal-modal', loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule) },
  { path: '**', redirectTo: '' },
  {
    path: 'cal-edit',
    loadChildren: () => import('./pages/cal-edit/cal-edit.module').then( m => m.CalEditPageModule)
  },
  {
    path: 'cal-mass',
    loadChildren: () => import('./pages/cal-mass/cal-mass.module').then( m => m.CalMassPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
