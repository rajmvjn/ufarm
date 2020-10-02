import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { ProfilePage } from "./profile-page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
