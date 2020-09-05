import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddSellItemPageRoutingModule } from "./add-sell-item-routing.module";

import { AddSellItemPage } from "./add-sell-item.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddSellItemPageRoutingModule,
  ],
  declarations: [AddSellItemPage],
})
export class AddSellItemPageModule {}
