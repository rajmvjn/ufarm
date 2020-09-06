import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NavController,
  LoadingController,
  AlertController,
} from "@ionic/angular";

import { ActivatedRoute } from "@angular/router";

import { SellService } from "./sell.service";
import { SharedService } from "../../shared/shared-service";
import { Subscription } from "rxjs";
import { SellItem } from "./sell.model";

@Component({
  selector: "app-sell",
  templateUrl: "./sell.page.html",
  styleUrls: ["./sell.page.scss"],
})
export class SellPage implements OnInit {
  private fetchAllObs$: Subscription;
  private sellItemsObs$: Subscription;
  private items: SellItem[];
  constructor(
    private loadingCtrl: LoadingController,
    private sellService: SellService,
    private sharedService: SharedService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.loadingCtrl
      .create({
        message: "Loading Sell Items..",
        keyboardClose: true,
      })
      .then((ldingEl) => {
        ldingEl.present();
        this.fetchAllObs$ = this.sellService.fetchSellItems().subscribe(
          () => {
            this.sellItemsObs$ = this.sellService.sellItems.subscribe(
              (sellItems) => {
                this.items = sellItems;
                console.log(this.items);
                ldingEl.dismiss();
              }
            );
          },
          (error) => {
            ldingEl.dismiss();
            this.alertCtrl
              .create({
                header: "Failure",
                message: "Some error happend try again later",
                buttons: ["Ok"],
              })
              .then((el) => el.present());
          }
        );
      });
  }
}
