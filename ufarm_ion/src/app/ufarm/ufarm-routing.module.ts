import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UfarmPage } from "./ufarm.page";

const routes: Routes = [
  {
    path: "farms",
    component: UfarmPage,
    children: [
      {
        path: "farm",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./farm/farm.module").then((m) => m.FarmPageModule),
          },
          {
            path: ":_id",
            loadChildren: () =>
              import(
                "../ufarm/farm/add-farm-detail/add-farm-detail.module"
              ).then((m) => m.AddFarmDetailPageModule),
          },
        ],
      },
      {
        path: "buy",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./buy/buy.module").then((m) => m.BuyPageModule),
          },
          {
            path: ":buyItemId",
            loadChildren: () =>
              import("./buy/buy-item-detail/buy-item-detail.module").then(
                (m) => m.BuyItemDetailPageModule
              ),
          },
        ],
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./cart/cart.module").then((m) => m.CartPageModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./orders/orders.module").then((m) => m.OrdersPageModule),
      },
      {
        path: "sell",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./sell/sell.module").then((m) => m.SellPageModule),
          },
          {
            path: "addsell",
            loadChildren: () =>
              import("./sell/add-sell-item/add-sell-item.module").then(
                (m) => m.AddSellItemPageModule
              ),
          },
          {
            path: ":sellItemId",
            loadChildren: () =>
              import("./sell/add-sell-item/add-sell-item.module").then(
                (m) => m.AddSellItemPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/ufarm/farms/buy",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/ufarm/farms/buy",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfarmPageRoutingModule {}
