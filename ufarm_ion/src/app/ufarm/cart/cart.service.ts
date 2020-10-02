import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cart } from "../cart/cart.model";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable, of } from "rxjs";
import { filter, switchMap, take, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  base_url = environment.BaseURL;
  private _cart_item = new BehaviorSubject<Cart[]>([]);

  constructor(private http: HttpClient) {}

  get cart_item() {
    return this._cart_item.asObservable();
  }

  fetchAllCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.base_url}v1/cart`).pipe(
      take(1),
      tap((items) => {
        this._cart_item.next(items);
      })
    );
  }

  fetchCartByStatus(status: string): Observable<Cart[]> {
    return this.http
      .get<Cart[]>(`${this.base_url}v1/cartbystatus/${status}`)
      .pipe(
        take(1),
        tap((items) => {
          this._cart_item.next(items);
        })
      );
  }

  addToCart(item: Cart): Observable<Cart[]> {
    let _id: string;
    return this.http.post(`${this.base_url}v1/cart`, item).pipe(
      take(1),
      switchMap((resData: any) => {
        _id = resData._id;
        return this._cart_item;
      }),
      take(1),
      tap((cartItems) => {
        item._id = _id;
        this._cart_item.next(cartItems.concat(item));
      })
    );
  }

  updateCartItem(id: string, status: string) {
    return this.cart_item.pipe(
      map((items) => {
        return items.filter((item) => item._id === id);
      }),
      take(1),
      switchMap((item) => {
        let updatedItem = { ...item[0] };
        updatedItem.status = status;
        console.log(updatedItem);
        return this.http.put(`${this.base_url}v1/cart/${id}`, updatedItem);
      }),
      take(1),
      switchMap((_) => {
        return this._cart_item;
      }),
      take(1),
      tap((cartItems) => {
        this._cart_item.next(cartItems.filter((item) => item._id !== id));
      })
    );
  }

  removeFromCart(id: string) {
    return this.http.delete(`${this.base_url}v1/cart/${id}`).pipe(
      take(1),
      switchMap((_) => {
        return this.cart_item;
      }),
      take(1),
      tap((cartItems) => {
        this._cart_item.next(cartItems.filter((item) => item._id !== id));
      })
    );
  }
}
