import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmItemDetailPage } from './farm-item-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FarmItemDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmItemDetailPageRoutingModule {}
