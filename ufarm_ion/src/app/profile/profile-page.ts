import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavController, LoadingController } from "@ionic/angular";

import { ActivatedRoute } from "@angular/router";

import { ProfileService } from "./profile.service";
import { SharedService } from "../shared/shared-service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile-page.html",
  styleUrls: ["./profile-page.scss"],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  isProfileLoaded: boolean = false;
  profileId: string;
  formFields = {
    name: "",
    phone: "",
    address: "",
    pincode: "",
    avatar: "",
    email: "",
  };
  constructor(
    private loadingCtrl: LoadingController,
    private profileService: ProfileService,
    private sharedService: SharedService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.route.paramMap.subscribe((paramMap) => {
      //  if (paramMap.has("user_id")) {
      this.profileId = "5f37bce45ff47e46f4e18072";
      this.isProfileLoaded = true;
      this.getProfile(this.profileId);
      // }
    });
  }

  initializeForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.formFields.name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      email: new FormControl(this.formFields.email, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      phone: new FormControl(this.formFields.phone, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      address: new FormControl(this.formFields.address, {
        validators: [Validators.required],
      }),
      pincode: new FormControl(this.formFields.pincode, {
        validators: [Validators.required],
      }),
      avatar: new FormControl(this.formFields.avatar),
      _id: new FormControl(""),
    });
  }

  onProfileUpdate(): void {
    this.loadingCtrl
      .create({ message: "Processing..", keyboardClose: true })
      .then((el) => {
        el.present();
        this.profileService
          .addEditProfile(this.profileForm.value)
          .subscribe(() => {
            this.navCtrl.navigateBack("/profile");
            el.dismiss();
          });
      });
  }

  onImagePicked(imageData: string | File) {
    this.profileForm.patchValue({
      avatar: this.sharedService.convertImageType(imageData),
    });
  }

  getProfile(id: string) {
    this.loadingCtrl
      .create({ message: "Processing..", keyboardClose: true })
      .then((el) => {
        el.present();
        this.profileService.getProfile(id).subscribe((profile) => {
          this.isProfileLoaded = false;
          console.log("profile", profile);
          this.profileForm.patchValue(profile);
          el.dismiss();
        });
      });
  }
}
