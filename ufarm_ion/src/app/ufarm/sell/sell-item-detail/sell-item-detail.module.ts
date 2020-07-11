import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellItemDetailPageRoutingModule } from './sell-item-detail-routing.module';

import { SellItemDetailPage } from './sell-item-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellItemDetailPageRoutingModule
  ],
  declarations: [SellItemDetailPage]
})
export class SellItemDetailPageModule {}
