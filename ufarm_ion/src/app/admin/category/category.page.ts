import { Component, OnInit, OnDestroy } from "@angular/core";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  NavController,
  IonItemSliding,
  LoadingController,
} from "@ionic/angular";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit, OnDestroy {
  categories: Category[];
  private categoriesSub: Subscription;
  private deleteSub: Subscription;
  private fetchaAllSub: Subscription;
  imgURL = `${environment.BaseURL}images/`;

  constructor(
    private catService: CategoryService,
    private navCtrl: NavController,
    private lodingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.lodingCtrl
      .create({
        message: "Loading Categories..",
        keyboardClose: true,
      })
      .then((ldingEl) => {
        ldingEl.present();
        this.fetchaAllSub = this.catService
          .fetchAllCategories()
          .subscribe(() => {
            this.categoriesSub = this.catService.categories.subscribe(
              (cats) => {
                this.categories = cats;
                ldingEl.dismiss();
              }
            );
          });
      });
  }

  onEdit(category_id: string) {
    this.navCtrl.navigateForward(`/admin/admins/category/edit/${category_id}`);
  }

  onDelete(category_id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.deleteSub = this.catService.deleteCategory(category_id).subscribe();
  }

  ngOnDestroy() {
    if (this.fetchaAllSub) {
      this.fetchaAllSub.unsubscribe();
    }
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
