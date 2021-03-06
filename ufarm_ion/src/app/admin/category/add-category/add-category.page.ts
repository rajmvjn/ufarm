import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../category.service";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ImageService } from "../../../shared/services/image/image.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.page.html",
  styleUrls: ["./add-category.page.scss"],
})
export class AddCategoryPage implements OnInit, OnDestroy {
  editCatId = "";
  getCatSub: Subscription;
  addCatSub: Subscription;
  imgUrl = environment.ImagesURL;

  form = new FormGroup({
    name: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    description: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.maxLength(180)],
    }),
    image_url: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private catService: CategoryService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private imgService: ImageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("category_id")) {
        this.editCatId = paramMap.get("category_id");
        this.getCatSub = this.catService
          .getCategory(this.editCatId)
          .subscribe((cat) => {
            this.form.patchValue({ ...cat });
          });
      }
    });
  }

  onAddCategory() {
    this.addCatSub = this.catService
      .addCategory(
        this.form.value.image_url,
        this.form.value.name,
        this.form.value.description,
        this.editCatId
      )
      .subscribe(() => {
        this.navCtrl.navigateBack("/admin/admins/category");
      });
  }

  onImagePicked(imageData: string | File) {
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
    this.form.patchValue({ image_url: imageFile });
  }

  ngOnDestroy() {
    console.log("destriyed..");
    if (this.getCatSub) {
      this.getCatSub.unsubscribe();
    }
    if (this.addCatSub) {
      this.addCatSub.unsubscribe();
    }
  }
}
