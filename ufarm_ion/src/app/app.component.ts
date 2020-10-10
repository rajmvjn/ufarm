import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CategoryService } from "./admin/category/category.service";
import { ProfileService } from "./profile/profile.service";
import { Profile } from "./profile/profile.model";
import { environment } from "../environments/environment";
import { AuthService } from "./auth/auth.service";
import { StorageService } from "./farm-core/localstorage/storage-service";
import constants from "./farm-core/constants/constants";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  userRoles = constants.USER_ROLE;
  profileName = this.userRoles.guest;
  userRole: string;
  imageBaseUrl = environment.ImagesURL;
  profileImage: string | File;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private catService: CategoryService,
    private profileService: ProfileService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //pre fetch the categories to use across the modules..
      this.catService.fetchAllCategories().subscribe(
        () => {},
        (err) => {}
      );
    });
  }

  ngOnInit() {
    this.profileService.profile.subscribe((profile: Profile) => {
      if (profile.name) {
        this.profileName = profile.name;
        this.profileImage = profile.avatar;
      }
    });

    this.authService.get_user_role_sub.subscribe((resData) => {
      this.userRole = resData;
    });

    //fetch the userprofile from storage in case user logged in before
    this.storageService
      .getStorageData({
        key: "loggedInUserProfile",
      })
      .then((data: Profile) => {
        this.authService.user_role_sub = data.admin ? "ADMIN" : "GUEST";
        this.profileService.setProfileAfterAuth(data);
      });
  }

  onLogout() {
    this.profileService.setProfileAfterAuth({});
    this.profileName = this.userRoles.guest;
    this.profileImage = "";
    //this.navCtrl.navigateBack("/auth");
    this.navCtrl.navigateRoot("/auth");
    //this.ngOnDestroy();
  }

  ngOnDestroy() {
    console.log("app component destroyed");
  }
}
