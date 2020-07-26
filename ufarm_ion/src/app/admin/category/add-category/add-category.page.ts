import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../category.service";
import { NavController } from "@ionic/angular";
import { PlaceLocation } from "./../../../shared/location.model";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.page.html",
  styleUrls: ["./add-category.page.scss"],
})
export class AddCategoryPage implements OnInit {
  form: FormGroup;
  editCatId = "";

  constructor(
    private catService: CategoryService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let name = null,
      description = null,
      image = null;

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("category_id")) {
        this.editCatId = paramMap.get("category_id");
        this.catService.getCategory(this.editCatId).subscribe((cat) => {
          name = cat.name;
          description = cat.description;
          image = `${environment.BaseURL}images/${cat.img_url}`;
        });
      }
      this.form = new FormGroup({
        name: new FormControl(name, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        description: new FormControl(description, {
          updateOn: "blur",
          validators: [Validators.required, Validators.maxLength(180)],
        }),
        image: new FormControl(image, {
          validators: [Validators.required],
        }),
      });
    });
  }

  onAddCategory() {
    this.catService
      .addCategory(
        this.form.get("image").value,
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
        imageFile = base64toBlob(
          imageData.replace("data:image/png;base64,", ""),
          "image/png"
        );
      } catch (error) {
        return;
      }
    } else {
      imageFile = imageData;
    }

    console.log(typeof imageFile);

    this.form.patchValue({ image: imageFile });
  }
}
