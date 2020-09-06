import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilePage } from "./profile-page";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage,
  },
  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersPageModule),
  },
  {
    path: "add-user",
    loadChildren: () =>
      import("./add-user/add-user.module").then((m) => m.AddUserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
