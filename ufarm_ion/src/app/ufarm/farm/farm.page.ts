import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoryService } from "../../admin/category/category.service";
import { Subscription } from "rxjs";
import { LoadingController, NavController } from "@ionic/angular";
import { AuthService } from "../../auth/auth.service";
import { FarmService } from "./farm.service";
import { FarmItem } from "./farm.model";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-farm",
  templateUrl: "./farm.page.html",
  styleUrls: ["./farm.page.scss"],
})
export class FarmPage implements OnInit, OnDestroy {
  catSub: Subscription;
  fetchAllSub: Subscription;
  farmItemSub: Subscription;

  isAdmin: boolean;
  farmItems: FarmItem[];
  imgURL = environment.ImagesURL;

  constructor(
    private catService: CategoryService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private farmService: FarmService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    //Fetch categories for both admin and customers get the rxjs subscriptions ready for the app..
    this.loadingCtrl
      .create({ message: "Loading..", keyboardClose: true })
      .then((el) => {
        el.present();
        this.isAdmin = this.authService.is_admin;
        this.catSub = this.catService.fetchAllCategories().subscribe(() => {
          el.dismiss();
        });

        this.fetchAllSub = this.farmService
          .fetchAllFarmItems()
          .subscribe(() => {
            this.farmItemSub = this.farmService.farm_item.subscribe(
              (farmItems) => {
                this.farmItems = farmItems;
                console.log(farmItems);
              }
            );
          });
      });
  }

  onCategoryChange(event: CustomEvent) {
    console.log(event.detail);
  }

  onEdit(_id: string) {
    this.navCtrl.navigateForward(`/admin/admins/farm/edit/${_id}`);
  }

  ngOnDestroy() {
    this.catSub.unsubscribe();
    this.fetchAllSub.unsubscribe();
    if (this.farmItemSub) {
      this.farmItemSub.unsubscribe();
    }
  }
}
