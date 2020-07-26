import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminPage } from "./admin.page";

const routes: Routes = [
  {
    path: "admins",
    component: AdminPage,
    children: [
      {
        path: "farm",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ufarm/farm/farm.module").then((m) => m.FarmPageModule),
          },
        ],
      },
      {
        path: "category",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./category/category.module").then(
                (m) => m.CategoryPageModule
              ),
          },
          {
            path: "add-category",
            loadChildren: () =>
              import("./category/add-category/add-category.module").then(
                (m) => m.AddCategoryPageModule
              ),
          },
          {
            path: "edit/:category_id",
            loadChildren: () =>
              import("./category/add-category/add-category.module").then(
                (m) => m.AddCategoryPageModule
              ),
          },
        ],
      },
      {
        path: "farm-support",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./farm-support/farm-support.module").then(
                (m) => m.FarmSupportPageModule
              ),
          },
        ],
      },
      {
        path: "seller-activation",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./seller-activation/seller-activation.module").then(
                (m) => m.SellerActivationPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/admin/admins/farm",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/admin/admins/farm",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
