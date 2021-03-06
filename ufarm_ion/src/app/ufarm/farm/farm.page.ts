import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoryService } from "../../admin/category/category.service";
import { Subscription } from "rxjs";
import { NavController } from "@ionic/angular";
import { AuthService } from "../../auth/auth.service";
import { FarmService } from "./farm.service";
import { FarmItem } from "./farm.model";
import { environment } from "../../../environments/environment";
import constants from "../../farm-core/constants/constants";

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
  itemsUnFiltered: FarmItem[];
  imgURL = environment.ImagesURL;
  user_role = constants.USER_ROLE;

  constructor(
    private catService: CategoryService,
    public authService: AuthService,
    private farmService: FarmService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    //Fetch categories for both admin and customers get the rxjs subscriptions ready for the app..

    console.log("farm init");

    this.fetchAllSub = this.farmService.fetchAllFarmItems().subscribe(() => {
      this.farmItemSub = this.farmService.farm_item.subscribe((farmItems) => {
        this.itemsUnFiltered = farmItems;
        this.catSub = this.catService.categories.subscribe((cats) => {
          this.onCategoryChange(null, cats[0]._id); // fetch only on load and get the right cat id..
        });
        console.log(farmItems);
      });
    });
  }

  onCategoryChange(event: CustomEvent, cat_id?: string) {
    let catId = cat_id ? cat_id : event.detail.value;
    this.farmItems = this.itemsUnFiltered?.filter(
      (item) => item.cat_id === catId
    );
  }

  ionViewWillEnter() {
    console.log("fuck man");
    this.onCategoryChange(null, "5f460b322491f911c896c64f");
  }

  onEdit(_id: string) {
    if (
      this.authService.get_user_role_sub.getValue() === this.user_role.admin
    ) {
      this.navCtrl.navigateForward(`/admin/admins/farm/edit/${_id}`);
    } else {
      this.navCtrl.navigateForward(`/ufarm/farms/farm/${_id}`);
    }
  }

  ngOnDestroy() {
    console.log("farm destroyed");
    if (this.catSub) {
      this.catSub.unsubscribe();
    }
    if (this.fetchAllSub) {
      this.fetchAllSub.unsubscribe();
    }
    if (this.farmItemSub) {
      this.farmItemSub.unsubscribe();
    }
  }
}
