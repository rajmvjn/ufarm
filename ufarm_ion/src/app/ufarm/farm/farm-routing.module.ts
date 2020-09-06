import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FarmPage } from "./farm.page";

const routes: Routes = [
  {
    path: "",
    component: FarmPage,
  },
  {
    path: "farm-item-detail",
    loadChildren: () =>
      import("./farm-item-detail/farm-item-detail.module").then(
        (m) => m.FarmItemDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmPageRoutingModule {}
