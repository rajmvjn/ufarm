import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UfarmPage } from './ufarm.page';

const routes: Routes = [
  {
    path: 'farms',
    component: UfarmPage,
    children: [
      {
        path: 'farm',
        children: [
          {
            path: '',
            loadChildren: () => import('./farm/farm.module').then( m => m.FarmPageModule)
          },
          {
            path: ':farmItemId',
            loadChildren: () => import('./farm/farm-item-detail/farm-item-detail.module').then( m => m.FarmItemDetailPageModule)
          }
        ]
      },
      {
        path: 'buy',
        children: [
          {
            path: '',
            loadChildren: () => import('./buy/buy.module').then( m => m.BuyPageModule)
          },
          {
            path: ':buyItemId',
            loadChildren: () => import('./buy/buy-item-detail/buy-item-detail.module').then( m => m.BuyItemDetailPageModule)
          }
        ]
      },
      {
        path: 'sell',
        children: [
          {
            path: '',
            loadChildren: () => import('./sell/sell.module').then( m => m.SellPageModule)
          },
          {
            path: 'addsell',
            loadChildren: () => import('./sell/add-sell-item/add-sell-item.module').then( m => m.AddSellItemPageModule)
          },
          {
            path: ':sellItemId',
            loadChildren: () => import('./sell/sell-item-detail/sell-item-detail.module').then( m => m.SellItemDetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/ufarm/farms/farm',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/ufarm/farms/farm',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfarmPageRoutingModule {}
