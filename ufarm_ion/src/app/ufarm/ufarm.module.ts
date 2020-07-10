import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UfarmPageRoutingModule } from './ufarm-routing.module';

import { UfarmPage } from './ufarm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UfarmPageRoutingModule
  ],
  declarations: [UfarmPage]
})
export class UfarmPageModule {}
