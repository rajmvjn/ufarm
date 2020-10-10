import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavController, AlertController, IonItemSliding } from "@ionic/angular";

import { ActivatedRoute } from "@angular/router";

import { SellService } from "./sell.service";
import { SharedService } from "../../shared/shared-service";
import { Subscription } from "rxjs";
import { SellItem } from "./sell.model";
import { environment } from "../../../environments/environment";
import { CategoryService } from "src/app/admin/category/category.service";
import { ProfileService } from "src/app/profile/profile.service";
import { Profile } from "src/app/profile/profile.model";

@Component({
  selector: "app-sell",
  templateUrl: "./sell.page.html",
  styleUrls: ["./sell.page.scss"],
})
export class SellPage implements OnInit, OnDestroy {
  private fetchAllObs$: Subscription;
  private sellItemsObs$: Subscription;
  private delSub: Subscription;
  items: SellItem[];
  itemsUnFiltered: SellItem[];
  imageUrl = environment.ImagesURL;
  isLoading = false;
  loggedInProfile: Profile;

  constructor(
    private sellService: SellService,
    private sharedService: SharedService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private catService: CategoryService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.profile.subscribe((profileData) => {
      if (profileData) {
        this.loggedInProfile = profileData;
      }
    });
    this.fetchItems();
  }

  fetchItems() {
    this.fetchAllObs$ = this.sellService
      .fetchSellItems(this.loggedInProfile._id)
      .subscribe(() => {
        this.sellItemsObs$ = this.sellService.sellItems.subscribe(
          (sellItems) => {
            this.itemsUnFiltered = sellItems;
            this.catService.categories.subscribe((cats) => {
              this.onCategoryChange(null, cats[0]._id); // fetch only on load and get the right cat id..
            });
          }
        );
      });
  }

  onCategoryChange(event: CustomEvent, cat_id?: string) {
    let catId = cat_id ? cat_id : event.detail.value;
    this.items = this.itemsUnFiltered?.filter(
      (item) => item.category_id === catId
    );
  }

  onEdit(id) {
    this.navCtrl.navigateForward(`ufarm/farms/sell/${id}`);
  }

  onDelete(id, slidingItem: IonItemSliding) {
    this.isLoading = true;
    this.delSub = this.sellService.deleteItem(id).subscribe(
      (_) => {
        this.isLoading = false;
        slidingItem.close();
      },
      (_) => (this.isLoading = false)
    );
  }

  ngOnDestroy() {
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }
}
