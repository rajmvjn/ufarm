import { Component, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { CartService } from "./cart.service";
import { environment } from "../../../environments/environment";
import Constants from "../../farm-core/constants/constants";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  isLoading = false;
  imageUrl = environment.ImagesURL;
  cart_status = Constants.CART_STATUS;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.fetchCartByStatus(this.cart_status.cart).subscribe();
  }

  onChangeStatus(id: string, status: string) {
    this.cartService.updateCartItem(id, status).subscribe(
      () => {},
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel(id: string, slidingEl: IonItemSliding) {
    this.cartService.removeFromCart(id).subscribe();
  }

  onBuy(id: string, quatity: number) {}
}
