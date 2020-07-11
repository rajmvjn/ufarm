import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyItemDetailPage } from './buy-item-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BuyItemDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyItemDetailPageRoutingModule {}
