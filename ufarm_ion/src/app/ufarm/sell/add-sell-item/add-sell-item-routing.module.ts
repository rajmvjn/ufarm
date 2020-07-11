import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSellItemPage } from './add-sell-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddSellItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSellItemPageRoutingModule {}
