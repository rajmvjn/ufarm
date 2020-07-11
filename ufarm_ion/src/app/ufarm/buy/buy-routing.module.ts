import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyPage } from './buy.page';

const routes: Routes = [
  {
    path: '',
    component: BuyPage
  },
  {
    path: 'buy-item-detail',
    loadChildren: () => import('./buy-item-detail/buy-item-detail.module').then( m => m.BuyItemDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyPageRoutingModule {}
