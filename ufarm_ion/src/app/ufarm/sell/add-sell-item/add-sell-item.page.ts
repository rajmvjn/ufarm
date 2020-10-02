import { Component, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-add-sell-item",
  templateUrl: "./add-sell-item.page.html",
  styleUrls: ["./add-sell-item.page.scss"],
})
export class AddSellItemPage implements OnInit {
  farmItemByCat: FarmItem[];
  formFields: SellItem;
  imageUrl: string;
  allowed_price_diff: number;
  showPreview: string;
  editItemId: string;

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
    offer_price_percentage: new FormControl(null, {
      validators: [Validators.required],
    }),
    image_url: new FormControl(null),
    sell_user_id: new FormControl(null),
    base_price: new FormControl({ value: 0, disabled: true }, [
      Validators.required,
    ]),
    name: new FormControl(null),
  });

  constructor(
    private sellService: SellService,
    private imgService: ImageService,
    private route: ActivatedRoute,
    public catService: CategoryService,
    public farmService: FarmService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    //this.initializeForm();
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("sellItemId")) {
        this.editItemId = paramMap.get("sellItemId");
        this.sellService
          .getSellItemById(this.editItemId)
          .subscribe((sellItem) => {
            this.sellItemForm.patchValue(sellItem);
            this.imageUrl = environment.ImagesURL;
            this.showPreview = sellItem.image_url;
            this.farmService
              .getFarmItem(sellItem.farm_id)
              .subscribe((farmItem) =>
                this.sellItemForm.patchValue({
                  base_price: farmItem.base_price,
                })
              );
          });
      }
    });
    this.farmService.farm_item.subscribe(
      (farmItems) => (this.farmItemByCat = farmItems)
    );
    this.onCatChage();
  }

  onAddEdit() {
    let newItem: SellItem = { ...this.sellItemForm.value };
    newItem.sell_user_id = "abc123";
    newItem.status = true;
    newItem.name = this.sellItemForm.get("name").value;
    if (this.editItemId) {
      newItem._id = this.editItemId;
    }

    this.sellService.addorEditSell(newItem).subscribe(
      (data) => {
        this.navCtrl.navigateBack("/ufarm/farms/sell");
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );
  }

  initializeForm() {}

  onCatChage() {
    this.sellItemForm.get("category_id").valueChanges.subscribe((val) => {
      this.farmService.getFarmItemsByCategory(val).subscribe((farmItems) => {
        this.farmItemByCat = farmItems;
      });
    });

    this.sellItemForm.get("farm_id").valueChanges.subscribe((val) => {
      this.farmItemByCat.filter((farmItem) => {
        if (farmItem._id === val) {
          let { _id, allowed_price_diff, ...formData } = { ...farmItem };
          this.sellItemForm.patchValue({ ...formData });
          this.allowed_price_diff = allowed_price_diff;
          /*this.sellItemForm
            .get("offer_price_percentage")
            .setValidators([Validators.min(1), Validators.max(10)]);*/
          this.imageUrl = environment.ImagesURL;
          this.showPreview = formData.image_url;
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
}
