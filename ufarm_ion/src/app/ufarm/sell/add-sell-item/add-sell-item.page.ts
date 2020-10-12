import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { NavController } from "@ionic/angular";

import { SellService } from "../sell.service";
import { environment } from "../../../../environments/environment";
import { SellItem } from "../sell.model";
import { CategoryService } from "../../../admin/category/category.service";
import { FarmService } from "../../farm/farm.service";
import { FarmItem } from "../../farm/farm.model";
import { ImageService } from "../../../shared/services/image/image.service";
import { ProfileService } from "../../../profile/profile.service";
import { Subscription } from "rxjs";
import { LoggerService } from "../../../shared/services/logger/logger.service";

@Component({
  selector: "app-add-sell-item",
  templateUrl: "./add-sell-item.page.html",
  styleUrls: ["./add-sell-item.page.scss"],
})
export class AddSellItemPage implements OnInit, OnDestroy {
  farmItemByCat: FarmItem[];
  formFields: SellItem;
  imageUrl: string;
  allowed_price_diff: number;
  showPreview: string;
  editItemId: string;
  allSubs: Subscription[] = [];
  farm_id_temp: string;

  sellItemForm = new FormGroup({
    farm_id: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    category_id: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    description: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.maxLength(180)],
    }),
    quantity_available: new FormControl(null, {
      validators: [Validators.required],
    }),
    unit: new FormControl(null, {
      validators: [Validators.required],
    }),
    //default price difference is zero, meaning sell item price will be base price
    offer_price_percentage: new FormControl(0, {
      validators: [Validators.required],
    }),
    image_url: new FormControl(null),
    sell_user_id: new FormControl(null),
    base_price: new FormControl({ value: 0, disabled: true }, [
      Validators.required,
    ]),
    name: new FormControl(null),
    status: new FormControl(true),
  });

  constructor(
    private sellService: SellService,
    private imgService: ImageService,
    private route: ActivatedRoute,
    public catService: CategoryService,
    public farmService: FarmService,
    public navCtrl: NavController,
    private profileService: ProfileService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    //fetch the depedent farm items data first,
    this.onCatChage(); // set the subscription up front for the cat
    this.allSubs[0] = this.farmService
      .fetchAllFarmItems()
      .subscribe((farmItems) => {
        this.farmItemByCat = farmItems;
        this.allSubs[1] = this.route.paramMap.subscribe((paramMap) => {
          if (paramMap.has("sellItemId")) {
            this.editItemId = paramMap.get("sellItemId");
            this.allSubs[2] = this.sellService
              .getSellItemById(this.editItemId)
              .subscribe((sellItem) => {
                this.imageUrl = environment.ImagesURL;
                this.showPreview = sellItem.image_url;
                //this.loggerService.log(sellItem);
                farmItems.forEach((farmItem) => {
                  if (farmItem._id === sellItem.farm_id) {
                    this.allowed_price_diff = farmItem.allowed_price_diff;
                    this.sellItemForm.patchValue({
                      base_price: farmItem.base_price,
                      farm_id: sellItem.farm_id,
                      ...sellItem,
                    });
                  }
                });
                //disable the farm sell change in the case of edit
                this.sellItemForm.get("farm_id").disable();
              });
          }
        });
      });

    //set the sell user as logged in user
    this.allSubs[4] = this.profileService.profile.subscribe((profileData) => {
      if (profileData) {
        this.sellItemForm.patchValue({
          sell_user_id: profileData._id,
        });
      }
    });
  }

  onAddEdit() {
    let newItem: SellItem = { ...this.sellItemForm.value };
    newItem.status = true;
    newItem.name = this.sellItemForm.get("name").value;
    if (this.editItemId) {
      newItem._id = this.editItemId;
    }

    if (!newItem.farm_id) {
      newItem.farm_id = this.farm_id_temp;
    }

    this.allSubs[5] = this.sellService.addorEditSell(newItem).subscribe((_) => {
      this.navCtrl.navigateBack("/ufarm/farms/sell");
    });
  }

  onCatChage() {
    this.allSubs[6] = this.sellItemForm
      .get("category_id")
      .valueChanges.subscribe((val) => {
        this.allSubs[7] = this.farmService
          .getFarmItemsByCategory(val)
          .subscribe((farmItems) => {
            this.farmItemByCat = farmItems;
          });
      });

    this.allSubs[8] = this.sellItemForm
      .get("farm_id")
      .valueChanges.subscribe((val) => {
        //check whether the item added already, then

        this.sellService.sellItems.subscribe((sellItem) => {
          const addedSell = sellItem.filter((s) => s.farm_id === val);
          if (addedSell.length) {
            this.editItemId = addedSell[0]._id;
            //taking off farm_id to stope update loop
            let { category_id, farm_id, ...formDataEdit } = { ...addedSell[0] };
            this.farm_id_temp = farm_id;

            this.farmItemByCat.filter((farmItem) => {
              if (farmItem._id === val) {
                let { allowed_price_diff, base_price } = { ...farmItem };
                //formDataEdit.base_price = base_price;
                this.populateSellForm(
                  formDataEdit,
                  allowed_price_diff,
                  base_price
                );
              }
            });
          } else {
            this.editItemId = null;
            this.farmItemByCat.filter((farmItem) => {
              if (farmItem._id === val) {
                let { _id, allowed_price_diff, ...formData } = { ...farmItem };
                this.populateSellForm(formData, allowed_price_diff);
              }
            });
          }
        });
      });
  }

  onImagePicked(imageData: string | File, inputField: string) {
    let imageFile;
    if (typeof imageData === "string") {
      try {
        imageFile = this.imgService.base64toBlob(
          imageData.replace("data:image/png;base64,", ""),
          "image/png"
        );
      } catch (error) {
        return;
      }
    } else {
      imageFile = imageData;
    }
    if (inputField === "image_url") {
      this.sellItemForm.patchValue({ image_url: imageFile });
    } else {
      this.sellItemForm.patchValue({ nutrition_fact_image_url: imageFile });
    }
  }

  populateSellForm(sellFromData, allowed_price_diff, base_price?) {
    if (base_price) {
      sellFromData.base_price = base_price;
    }

    this.sellItemForm.patchValue(sellFromData);

    this.allowed_price_diff = allowed_price_diff;
    this.sellItemForm
      .get("offer_price_percentage")
      .setValidators(
        Validators.compose([
          Validators.required,
          Validators.max(allowed_price_diff),
          Validators.min(allowed_price_diff * -1),
        ])
      );
    this.imageUrl = environment.ImagesURL;
    this.showPreview = sellFromData.image_url;
  }

  ngOnDestroy() {
    console.log("add sell destroy");
    if (this.allSubs.length) {
      this.allSubs.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
