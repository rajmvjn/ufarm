import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { take, tap, switchMap, map } from "rxjs/operators";

import { AutoCompleteService } from "ionic4-auto-complete";

import { SellItem } from "./sell.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class SellService implements AutoCompleteService {
  BaseURL = environment.BaseURL;
  private _sellItems = new BehaviorSubject<SellItem[]>([]);
  labelAttribute = "name";
  formValueAttribute = "numericCode";
  constructor(private http: HttpClient) {}

  get sellItems() {
    return this._sellItems.asObservable();
  }

  fetchSellItems(): Observable<SellItem[]> {
    return this.http.get<SellItem[]>(`${this.BaseURL}v1/items`).pipe(
      take(1),
      tap((items) => {
        items.map((item) => {
          item.image_url = `${environment.BaseURL}images/${item.image_url}
       `;
        });
        this._sellItems.next(items);
      })
    );
  }

  getFormFields() {
    return {
      _id: "",
      name: "",
      category_id: "",
      farm_id: "",
      description: "",
      quantity_available: 0,
      price: 0,
      unit: "",
      unit_value: 0,
      sell_user_id: "",
      offer_price: 0,
      image_url: "",
      country: "",
    };
  }

  getResults(keyword: string) {
    if (!keyword) {
      return false;
    }

    return this.http
      .get("https://restcountries.eu/rest/v2/name/" + keyword)
      .pipe(
        map((result: any[]) => {
          return result.filter((item) => {
            return item.name.toLowerCase().startsWith(keyword.toLowerCase());
          });
        })
      );
  }
}
