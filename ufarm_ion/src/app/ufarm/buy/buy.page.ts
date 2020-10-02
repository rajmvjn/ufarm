import { Component, OnInit } from "@angular/core";
import { AlertController, IonItemSliding, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { CategoryService } from "../../admin/category/category.service";
import { SellItem } from "../sell/sell.model";
import { SellService } from "../sell/sell.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-buy",
  templateUrl: "./buy.page.html",
  styleUrls: ["./buy.page.scss"],
})
export class BuyPage implements OnInit {
  fetchAllObs$: Subscription;
  sellItemsObs$: Subscription;
  itemsUnFiltered: SellItem[];
  items: SellItem[];
  isLoading: false;
  imageUrl = environment.ImagesURL;

  constructor(
    private sellService: SellService,
    private catService: CategoryService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
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

  onDetails(item_id: string) {
    this.navCtrl.navigateForward(`ufarm/farms/buy/${item_id}`);
  }
  onAddCart(item_id: string, element: IonItemSliding) {}
}
