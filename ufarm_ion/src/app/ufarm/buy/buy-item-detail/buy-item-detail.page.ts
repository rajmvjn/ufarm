import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FarmService } from "../../farm/farm.service";
import { SellService } from "../../sell/sell.service";
import { environment } from "../../../../environments/environment";
import { SellItem } from "../../sell/sell.model";
import { FarmItem } from "../../farm/farm.model";
import { Cart } from "../../cart/cart.model";
import { CartService } from "../../cart/cart.service";
import constants from "../../../farm-core/constants/constants";
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-buy-item-detail",
  templateUrl: "./buy-item-detail.page.html",
  styleUrls: ["./buy-item-detail.page.scss"],
})
export class BuyItemDetailPage implements OnInit {
  buyItemId: string;
  imageUrl = environment.ImagesURL;
  showPreview: string;
  item: SellItem;
  farmItem: FarmItem;
  cartItem: Cart;

  constructor(
    private route: ActivatedRoute,
    private sellService: SellService,
    private farmService: FarmService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("buyItemId")) {
        this.buyItemId = paramMap.get("buyItemId");

        this.sellService
          .getSellItemById(this.buyItemId)
          .subscribe((buyItem) => {
            this.item = buyItem;
            this.showPreview = buyItem.image_url;
            this.farmService
              .getFarmItem(buyItem.farm_id)
              .subscribe((farmItem) => (this.farmItem = farmItem));
          });
      }
    });
  }

  onBuyNow() {
    if (
      this.authService.get_user_role_sub.value === constants.USER_ROLE.guest
    ) {
    } else {
      // add to cart with confirm status ie reduce the available quantity as well.
    }
  }

  onCartAdd() {
    let elementRef = document.getElementById(
      "order_quantity"
    ) as HTMLInputElement;

    this.cartItem = {
      buy_user_id: "234",
      sell_user_id: "123",
      item_id: this.buyItemId,
      quantity: parseInt(elementRef.value),
      status: constants.CART_STATUS.cart,
    };

    this.cartService.addToCart(this.cartItem).subscribe();
  }
}
