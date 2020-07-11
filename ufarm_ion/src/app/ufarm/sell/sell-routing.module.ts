import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellPage } from './sell.page';

const routes: Routes = [
  {
    path: '',
    component: SellPage
  },
  {
    path: 'sell-item-detail',
    loadChildren: () => import('./sell-item-detail/sell-item-detail.module').then( m => m.SellItemDetailPageModule)
  },
  {
    path: 'add-sell-item',
    loadChildren: () => import('./add-sell-item/add-sell-item.module').then( m => m.AddSellItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellPageRoutingModule {}
