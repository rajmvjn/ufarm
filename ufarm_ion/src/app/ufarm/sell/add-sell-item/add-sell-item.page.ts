import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import {
  NavController,
  AlertController,
  LoadingController,
} from "@ionic/angular";

import { SellService } from "../sell.service";
import { PlaceLocation } from "./../../../shared/location.model";
import { environment } from "../../../../environments/environment";
import { SellItem } from "../sell.model";

@Component({
  selector: "app-add-sell-item",
  templateUrl: "./add-sell-item.page.html",
  styleUrls: ["./add-sell-item.page.scss"],
})
export class AddSellItemPage implements OnInit {
  sellItemForm: FormGroup;
  formFields: SellItem;
  constructor(
    private sellService: SellService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.route.paramMap.subscribe((paramMap) => {});
  }

  initializeForm() {
    this.formFields = this.sellService.getFormFields();
    this.sellItemForm = new FormGroup({
      name: new FormControl(this.formFields.name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),

      category_id: new FormControl(this.formFields.category_id, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      description: new FormControl(this.formFields.description, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      quantity_available: new FormControl(this.formFields.quantity_available, {
        validators: [Validators.required],
      }),
      price: new FormControl(this.formFields.price, {
        validators: [Validators.required],
      }),
      unit: new FormControl(this.formFields.unit, {
        validators: [Validators.required],
      }),
      unit_value: new FormControl(this.formFields.unit_value, {
        validators: [Validators.required],
      }),
      offer_price: new FormControl(this.formFields.offer_price, {
        validators: [Validators.required],
      }),
      image_url: new FormControl(this.formFields.image_url),
      _id: new FormControl(""),
    });
  }
}
