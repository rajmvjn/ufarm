import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, IonItemSliding } from "@ionic/angular";

import { ActivatedRoute } from "@angular/router";

import { SellService } from "./sell.service";
import { SharedService } from "../../shared/shared-service";
import { Subscription } from "rxjs";
import { SellItem } from "./sell.model";
import { environment } from "../../../environments/environment";
import { CategoryService } from "src/app/admin/category/category.service";

@Component({
  selector: "app-sell",
  templateUrl: "./sell.page.html",
  styleUrls: ["./sell.page.scss"],
})
export class SellPage implements OnInit {
  private fetchAllObs$: Subscription;
  private sellItemsObs$: Subscription;
  items: SellItem[];
  itemsUnFiltered: SellItem[];
  imageUrl = environment.ImagesURL;
  isLoading = false;

  constructor(
    private sellService: SellService,
    private sharedService: SharedService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private catService: CategoryService
  ) {}

  ngOnInit() {
    this.fetchItems();
  }

  onCategoryChange(event: CustomEvent, cat_id?: string) {
    let catId = cat_id ? cat_id : event.detail.value;
    this.items = this.itemsUnFiltered?.filter(
      (item) => item.category_id === catId
    );
  }

  fetchItems() {
    this.fetchAllObs$ = this.sellService.fetchSellItems().subscribe(
      () => {
        this.sellItemsObs$ = this.sellService.sellItems.subscribe(
          (sellItems) => {
            this.itemsUnFiltered = sellItems;
            this.catService.categories.subscribe((cats) => {
              this.onCategoryChange(null, cats[0]._id); // fetch only on load and get the right cat id..
            });
          }
        );
      },
      () => {
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

  onEdit(id) {
    this.navCtrl.navigateForward(`ufarm/farms/sell/${id}`);
  }

  onDelete(id, slidingItem: IonItemSliding) {
    this.isLoading = true;
    this.sellService.deleteItem(id).subscribe(
      (resData) => {
        this.isLoading = false;
        slidingItem.close();
      },
      (err) => (this.isLoading = false)
    );
  }
}
