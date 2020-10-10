import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { take, tap, switchMap, map, retry, catchError } from "rxjs/operators";

import { SellItem } from "./sell.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class SellService {
  BaseURL = environment.BaseURL;
  private _sell_items = new BehaviorSubject<SellItem[]>([]);
  private _buy_items = new BehaviorSubject<SellItem[]>([]);
  labelAttribute = "name";
  formValueAttribute = "numericCode";
  editItemId: string;
  editAddItemObs: Observable<SellItem>;

  constructor(private http: HttpClient) {}

  get sellItems() {
    return this._sell_items.asObservable();
  }

  get buyItems() {
    return this._buy_items.asObservable();
  }

  fetchSellItems(id: string): Observable<SellItem[]> {
    return this.http.get<SellItem[]>(`${this.BaseURL}v1/sell-items/${id}`).pipe(
      take(1),
      tap((items) => {
        this._sell_items.next(items);
      })
    );
  }

  fetchBuyItems(id: string): Observable<SellItem[]> {
    return this.http.get<SellItem[]>(`${this.BaseURL}v1/buy-items/${id}`).pipe(
      take(1),
      tap((items) => {
        this._buy_items.next(items);
      })
    );
  }

  addorEditSell(sellItem: SellItem) {
    let _id: string;
    let imageUrl: string;
    let formData = new FormData();

    for (const key in sellItem) {
      if (typeof sellItem[key] !== "object") {
        formData.append(key, sellItem[key]);
      }
    }

    //append the image only in case add or dirty in edit..
    if (sellItem["image_url"] && typeof sellItem["image_url"] !== "string") {
      formData.append(
        "sell_image",
        sellItem["image_url"],
        new Date().getTime() + ".png"
      );
    }

    if (sellItem._id) {
      //edit
      this.editItemId = sellItem._id;
      this.editAddItemObs = this.http.put<SellItem>(
        `${this.BaseURL}v1/sell/${sellItem._id}`,
        sellItem
      );
    } else {
      //add
      this.editItemId = "";
      this.editAddItemObs = this.http.post<SellItem>(
        `${this.BaseURL}v1/sell`,
        sellItem
      );
    }

    return this.editAddItemObs.pipe(
      take(1),
      switchMap((resData: any) => {
        imageUrl = resData.image_url;
        _id = resData._id;
        return this.sellItems;
      }),
      take(1),
      tap((sellItems) => {
        if (this.editItemId) {
          sellItems.map((sellItemEdit, index) => {
            if (sellItemEdit._id === this.editItemId) {
              sellItems[index] = { ...sellItem };
            }
          });
          this._sell_items.next(sellItems);
        } else {
          let new_sell_item = { _id: _id, image_url: imageUrl, ...sellItem };
          this._sell_items.next(sellItems.concat(new_sell_item));
        }
      })
    );
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.BaseURL}v1/sell/${id}`).pipe(
      take(1),
      switchMap((resData) => {
        return this.sellItems;
      }),
      take(1),
      tap((sellItems) => {
        this._sell_items.next(
          sellItems.filter((sellItem) => sellItem._id !== id)
        );
      })
    );
  }

  getSellItemById(id: string) {
    return this.sellItems.pipe(
      take(1),
      switchMap((sellItems) => {
        return sellItems.filter((sellItem) => sellItem._id === id);
      })
    );
  }
}
