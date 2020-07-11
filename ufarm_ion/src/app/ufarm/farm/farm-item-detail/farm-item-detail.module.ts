import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmItemDetailPageRoutingModule } from './farm-item-detail-routing.module';

import { FarmItemDetailPage } from './farm-item-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmItemDetailPageRoutingModule
  ],
  declarations: [FarmItemDetailPage]
})
export class FarmItemDetailPageModule {}
