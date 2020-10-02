import { Injectable } from "@angular/core";
import { FarmItem } from "./farm.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { take, switchMap, tap, map, catchError, filter } from "rxjs/operators";
import { AutoCompleteService } from "ionic4-auto-complete";

@Injectable({
  providedIn: "root",
})
export class FarmService implements AutoCompleteService {
  base_url = environment.BaseURL;
  _farm_item = new BehaviorSubject<FarmItem[]>([]);
  imgUrl = environment.ImagesURL;
  editAddObs: Observable<FarmItem>;
  editFarmId: string;

  get farm_item() {
    return this._farm_item.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchAllFarmItems() {
    return this.http.get<FarmItem[]>(`${this.base_url}v1/farm`).pipe(
      take(1),
      tap((farmItems) => {
        this._farm_item.next(farmItems);
      })
    );
  }

  getFarmItemsByCategory(cat_id: string): Observable<FarmItem[]> {
    return this.farm_item.pipe(
      map((farm_item) => farm_item.filter((item) => item.cat_id === cat_id))
    );
  }

  getResults(keyword: string): Observable<any[]> {
    return this.farm_item.pipe(
      map((farmitem) => {
        return farmitem.filter((item) =>
          item.name.toLowerCase().startsWith(keyword.toLowerCase())
        );
      })
    );
  }

  getFarmItem(_id: string) {
    return this.farm_item.pipe(
      take(1),
      switchMap((farmItems) => {
        return farmItems.filter((farmItem) => farmItem._id === _id);
      })
    );
  }

  addFarmItem(farmItem: FarmItem) {
    console.log(farmItem);
    let formData = new FormData();
    farmItem.status = true;
    farmItem.date = new Date();

    for (const key in farmItem) {
      if (typeof farmItem[key] !== "object") {
        formData.append(key, farmItem[key]);
      }
    }

    //append the image only in case add or dirty in edit..
    if (farmItem["image_url"] && typeof farmItem["image_url"] !== "string") {
      formData.append(
        "product_image",
        farmItem["image_url"],
        new Date().getTime() + ".png"
      );
    }

    if (farmItem._id) {
      this.editFarmId = farmItem._id;
      this.editAddObs = this.http.put<any>(
        `${this.base_url}v1/farm/${farmItem._id}`,
        formData
      );
    } else {
      this.editFarmId = "";
      this.editAddObs = this.http.post<any>(
        `${this.base_url}v1/farm`,
        formData
      );
    }

    /*formData.append(
      "nutrition_fact_image_url",
      farmItem["nutrition_fact_image_url"],
      new Date().getTime() + ".png"
    );*/

    return this.editAddObs.pipe(
      take(1),
      switchMap((resData: any) => {
        farmItem._id = resData._id;
        farmItem.image_url = resData.image_url;
        return this.farm_item;
      }),
      take(1),
      tap((farmItems) => {
        if (this.editFarmId) {
          farmItems.map((farmItemEdit, index) => {
            if (farmItemEdit._id === this.editFarmId) {
              farmItems[index] = { ...farmItem };
            }
          });
          this._farm_item.next(farmItems);
        } else {
          this._farm_item.next(farmItems.concat(farmItem));
        }
      })
    );
  }
}
