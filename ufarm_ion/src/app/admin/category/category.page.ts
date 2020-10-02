import { Component, OnInit, OnDestroy } from "@angular/core";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";
import { Subscription } from "rxjs";
import { NavController, IonItemSliding, AlertController } from "@ionic/angular";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit, OnDestroy {
  categories: Category[];
  isLoading = false;
  imgUrl = environment.ImagesURL;

  private categoriesSub: Subscription;
  private deleteSub: Subscription;
  private fetchaAllSub: Subscription;

  constructor(
    private catService: CategoryService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.fetchaAllSub = this.catService.fetchAllCategories().subscribe(
      () => {
        this.categoriesSub = this.catService.categories.subscribe((cats) => {
          this.categories = cats;
        });
      },
      (error) => {
        this.alertCtrl
          .create({
            header: "Failure",
            message: "Some error happend try again later",
            buttons: ["Ok"],
          })
          .then((el) => el.present());
      }
    );
  }

  onEdit(category_id: string) {
    this.navCtrl.navigateForward(`/admin/admins/category/edit/${category_id}`);
  }

  onDelete(category_id: string, slidingItem: IonItemSliding) {
    this.isLoading = true;
    this.deleteSub = this.catService
      .deleteCategory(category_id)
      .subscribe(() => {
        this.isLoading = false;
        slidingItem.close();
      });
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
