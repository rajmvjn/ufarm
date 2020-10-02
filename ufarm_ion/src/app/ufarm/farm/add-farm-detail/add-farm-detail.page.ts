import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ImageService } from "../../../shared/services/image/image.service";
import { FarmService } from "../farm.service";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../../admin/category/category.service";
import { Category } from "../../../admin/category/category.model";
import { environment } from "../../../../environments/environment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-farm-detail",
  templateUrl: "./add-farm-detail.page.html",
  styleUrls: ["./add-farm-detail.page.scss"],
})
export class AddFarmDetailPage implements OnInit, OnDestroy {
  edit_id = "";
  imageUrl = "";
  categories: Category[];
  getCatSub: Subscription;
  addFarmSub: Subscription;
  getFarmSub: Subscription;

  form = new FormGroup({
    name: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    description: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    image_url: new FormControl(null, {
      validators: [Validators.required],
    }),
    scientific_name: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    how_to_farm: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    nutrition_fact_image_url: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    base_price: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    cat_id: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    unit: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    allowed_price_diff: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    _id: new FormControl(null, {}),
  });

  constructor(
    private imgService: ImageService,
    private farmService: FarmService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private catService: CategoryService
  ) {}

  ngOnInit() {
    this.getCatSub = this.catService.categories.subscribe((cats) => {
      this.categories = cats;
    });

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("_id")) {
        this.edit_id = paramMap.get("_id");
        this.getFarmSub = this.farmService
          .getFarmItem(this.edit_id)
          .subscribe((farmItem) => {
            //farmItem.nutrition_fact_image_url = farmItem.image_url;
            this.form.patchValue({ ...farmItem });
          });
        this.imageUrl = environment.ImagesURL;
      }
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
      this.form.patchValue({ image_url: imageFile });
    } else {
      this.form.patchValue({ nutrition_fact_image_url: imageFile });
    }
  }

  onAddFarmItem() {
    this.addFarmSub = this.farmService
      .addFarmItem(this.form.value)
      .subscribe(() => {
        this.navCtrl.navigateBack("/admin/admins/farm");
      });
  }

  ngOnDestroy() {
    if (this.getCatSub) {
      this.getCatSub.unsubscribe();
    }
    if (this.addFarmSub) {
      this.addFarmSub.unsubscribe();
    }
    if (this.getFarmSub) {
      this.getFarmSub.unsubscribe();
    }
  }
}
