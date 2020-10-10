import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { Profile } from "../profile/profile.model";
import { ProfileService } from "../profile/profile.service";
import { ToastService } from "../shared/services/toast/toast.service";
import { AuthService } from "./auth.service";
import constants from "../farm-core/constants/constants";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLogin = true;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  onSwitchAuthMode() {
    //this.isLogin = !this.isLogin;
    this.navCtrl.navigateForward("/profile");
  }

  onSkip() {
    this.authService.skipLogin().subscribe((_) => {
      this.navCtrl.navigateForward("/ufarm/farms/buy");
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe((profile: Profile) => {
      if (profile[0]) {
        this.profileService.setProfileAfterAuth(profile[0]);
        this.authService.isuser_authenticated = true;
        if (profile[0].admin) {
          this.authService.user_role_sub = constants.USER_ROLE.admin;
          this.navCtrl.navigateForward("/admin/admins/farm");
        } else {
          this.authService.user_role_sub = constants.USER_ROLE.customer;
          this.navCtrl.navigateForward("/ufarm/farms/buy");
        }
      } else {
        this.toastService.presentToast("Invalid email or password !", 5000);
      }
    });
  }
}
