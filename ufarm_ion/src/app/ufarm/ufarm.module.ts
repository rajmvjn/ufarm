import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UfarmPageRoutingModule } from './ufarm-routing.module';

import { UfarmPage } from './ufarm.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UfarmPageRoutingModule,
    SharedModule
  ],
  declarations: [UfarmPage]
})
export class UfarmPageModule {}
