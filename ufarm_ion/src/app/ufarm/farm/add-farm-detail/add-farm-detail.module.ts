import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { AddFarmDetailPageRoutingModule } from "./add-farm-detail-routing.module";

import { AddFarmDetailPage } from "./add-farm-detail.page";
import { SharedModule } from "./../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddFarmDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [AddFarmDetailPage],
})
export class AddFarmDetailPageModule {}
