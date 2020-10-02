import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";

import { ProfileService } from "./profile.service";
import { SharedService } from "../shared/shared-service";
import { environment } from "../../environments/environment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile-page.html",
  styleUrls: ["./profile-page.scss"],
})
export class ProfilePage implements OnInit, OnDestroy {
  password_type = "password";
  profileSub: Subscription;
  isProfileLoaded: boolean = false;
  profileId: string;
  imageUrl = environment.ImagesURL;

  profileForm = new FormGroup({
    name: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    email: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    password: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required],
    }),
    phone: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.maxLength(180)],
    }),
    housename: new FormControl(null, {
      validators: [Validators.required],
    }),
    address: new FormControl(null, {
      validators: [Validators.required],
    }),
    pincode: new FormControl(null, {
      validators: [Validators.required],
    }),
    avatar: new FormControl(null),
    admin: new FormControl(false),
    status: new FormControl(true),
    sell: new FormControl(false),
    _id: new FormControl(null),
  });

  constructor(
    private profileService: ProfileService,
    private sharedService: SharedService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("inside profile..");
    this.profileSub = this.profileService.profile.subscribe(
      (profile) => {
        console.log(profile);
        if (profile) {
          this.profileForm.patchValue(profile);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("complted");
      }
    );
  }

  onToggleType() {
    this.password_type = this.password_type === "text" ? "password" : "text";
  }

  onProfileUpdate(): void {
    this.profileService.addEditProfile(this.profileForm.value).subscribe(() => {
      this.onNavigateback();
    });
  }

  onNavigateback() {
    this.navCtrl.pop();
  }

  onImagePicked(imageData: string | File) {
    this.profileForm.patchValue({
      avatar: this.sharedService.convertImageType(imageData),
    });
  }

  onLocationPicked(address: any) {
    this.profileForm.patchValue({ address: address });
  }

  ngOnDestroy() {
    console.log("profile destroyy..");

    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }
}
