import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellItemDetailPage } from './sell-item-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SellItemDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellItemDetailPageRoutingModule {}
