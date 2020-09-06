import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { ProfilePage } from "./profile-page";
import { ProfileService } from "./profile.service";
import { SharedService } from "../shared/shared-service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ProfilePage],
  providers: [ProfileService, SharedService],
})
export class ProfilePageModule {}
