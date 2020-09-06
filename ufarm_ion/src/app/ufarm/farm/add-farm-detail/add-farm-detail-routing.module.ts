import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFarmDetailPage } from './add-farm-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AddFarmDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFarmDetailPageRoutingModule {}
