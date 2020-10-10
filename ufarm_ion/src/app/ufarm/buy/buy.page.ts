import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonItemSliding, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { CategoryService } from "../../admin/category/category.service";
import { SellItem } from "../sell/sell.model";
import { SellService } from "../sell/sell.service";
import { environment } from "../../../environments/environment";
import { Profile } from "../../profile/profile.model";
import { ProfileService } from "../../profile/profile.service";
import { FarmService } from "../farm/farm.service";

@Component({
  selector: "app-buy",
  templateUrl: "./buy.page.html",
  styleUrls: ["./buy.page.scss"],
})
export class BuyPage implements OnInit, OnDestroy {
  fetchAllObs$: Subscription;
  sellItemsObs$: Subscription;
  profileSub$: Subscription;
  catSub$: Subscription;
  fetchAllSub$: Subscription;
  itemsUnFiltered: SellItem[];
  items: SellItem[];
  isLoading: false;
  imageUrl = environment.ImagesURL;
  loggedInProfile: Profile;

  constructor(
    private sellService: SellService,
    private catService: CategoryService,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private farmService: FarmService
  ) {}

  ngOnInit() {
    this.profileSub$ = this.profileService.profile.subscribe((data) => {
      this.loggedInProfile = data;
    });

    this.fetchAllSub$ = this.farmService.fetchAllFarmItems().subscribe(() => {
      this.fetchItems();
    });
  }

  onCategoryChange(event: CustomEvent, cat_id?: string) {
    let catId = cat_id ? cat_id : event.detail.value;
    this.items = this.itemsUnFiltered?.filter(
      (item) => item.category_id === catId
    );
  }

  fetchItems() {
    this.fetchAllObs$ = this.sellService
      .fetchBuyItems(this.loggedInProfile._id)
      .subscribe(() => {
        this.sellItemsObs$ = this.sellService.buyItems.subscribe(
          (sellItems) => {
            this.itemsUnFiltered = sellItems;
            this.catSub$ = this.catService.categories.subscribe((cats) => {
              this.onCategoryChange(null, cats[0]?._id); // fetch only on load and get the right cat id..
            });
          }
        );
      });
  }

  onDetails(item_id: string) {
    this.navCtrl.navigateForward(`ufarm/farms/buy/${item_id}`);
  }
  onAddCart(item_id: string, element: IonItemSliding) {}

  ngOnDestroy() {
    if (this.fetchAllObs$) {
      this.fetchAllObs$.unsubscribe();
    }
    if (this.sellItemsObs$) {
      this.sellItemsObs$.unsubscribe();
    }
    if (this.profileSub$) {
      this.profileSub$.unsubscribe();
    }
    if (this.catSub$) {
      this.catSub$.unsubscribe();
    }
  }
}
