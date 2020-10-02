import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart/cart.service";
import Constants from "../../farm-core/constants/constants";
import { environment } from "../../../environments/environment";
import { IonItemSliding } from "@ionic/angular";
import { Cart } from "../cart/cart.model";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.page.html",
  styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit {
  isLoading = false;
  imageUrl = environment.ImagesURL;
  cart_status = Constants.CART_STATUS;
  items: Cart[];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.fetchAllCartItems().subscribe((cartItems) => {
      this.items = cartItems.filter(
        (item) => item.status !== this.cart_status.cart
      );
    });
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
