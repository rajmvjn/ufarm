import { Injectable } from "@angular/core";
import { Category } from "../category/category.model";
import { BehaviorSubject, Observable } from "rxjs";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  BaseURL = environment.BaseURL;
  private _categories = new BehaviorSubject<Category[]>([]);
  editAddSub: Observable<Category>;

  constructor(private htttp: HttpClient) {}

  fetchAllCategories() {
    return this.htttp.get<Category[]>(`${this.BaseURL}v1/categories`).pipe(
      take(1),
      tap((cats) => {
        this.updateCategories(cats);
      })
    );
  }

  get categories() {
    return this._categories.asObservable();
  }

  private updateCategories(cats: Category[]) {
    this._categories.next(cats);
  }

  addCategory(
    imageData: File,
    name: string,
    description: string,
    editCatId: string
  ) {
    let imgURL = "";
    let _id = "";
    const imgName = new Date().getTime() + ".png";
    const uploadData = new FormData();

    uploadData.append("name", name);
    uploadData.append("description", description);
    if (typeof imageData !== "string") {
      // on edit if the image not changed then its the strin type loaded from server
      uploadData.append("category_image", imageData, imgName);
    }
    if (editCatId) {
      this.editAddSub = this.htttp.put<any>(
        `${this.BaseURL}v1/category/${editCatId}`,
        uploadData
      );
    } else {
      this.editAddSub = this.htttp.post<any>(
        `${this.BaseURL}v1/category`,
        uploadData
      );
    }
    return this.editAddSub.pipe(
      take(1),
      switchMap((resData) => {
        imgURL = resData.image_url;
        _id = resData._id;
        return this.categories; // this witches to new observable, new observable returned after http observable
      }),
      take(1),
      tap((cats) => {
        const category = new Category(name, description, imgURL, true, _id);
        if (editCatId) {
          cats.map((cat, index) => {
            if (cat._id === _id) {
              cat.name = name;
              cat.description = description;
              cat.image_url = imgURL;
            }
          });
          this.updateCategories(cats);
        } else {
          this.updateCategories(cats.concat(category));
        }
      })
    );
  }

  getCategory(id: string) {
    return this.categories.pipe(
      take(1),
      switchMap((cats) => {
        return cats.filter((cat) => cat._id === id);
      })
    );
  }

  deleteCategory(cat_id: string) {
    return this.htttp.delete(`${this.BaseURL}v1/category/${cat_id}`).pipe(
      take(1),
      switchMap(() => {
        return this.categories;
      }),
      take(1),
      tap((cats) => {
        this.updateCategories(cats.filter((cat) => cat._id !== cat_id));
      })
    );
  }
}
