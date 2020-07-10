import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UfarmPage } from './ufarm.page';

const routes: Routes = [
  {
    path: '',
    component: UfarmPage
  },
  {
    path: 'farm',
    loadChildren: () => import('./farm/farm.module').then( m => m.FarmPageModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./buy/buy.module').then( m => m.BuyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfarmPageRoutingModule {}
