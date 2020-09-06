import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SellPageRoutingModule } from "./sell-routing.module";
import { SellPage } from "./sell.page";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [SellPage],
})
export class SellPageModule {}
