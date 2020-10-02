import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuyItemDetailPageRoutingModule } from "./buy-item-detail-routing.module";

import { BuyItemDetailPage } from "./buy-item-detail.page";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyItemDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [BuyItemDetailPage],
})
export class BuyItemDetailPageModule {}
