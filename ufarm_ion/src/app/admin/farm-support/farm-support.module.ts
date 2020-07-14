import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmSupportPageRoutingModule } from './farm-support-routing.module';

import { FarmSupportPage } from './farm-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmSupportPageRoutingModule
  ],
  declarations: [FarmSupportPage]
})
export class FarmSupportPageModule {}
