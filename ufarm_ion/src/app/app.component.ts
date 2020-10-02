import { Component, OnInit } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CategoryService } from "./admin/category/category.service";
import { ProfileService } from "./profile/profile.service";
import { Profile } from "./profile/profile.model";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  profileName = "Guest";
  imageBaseUrl = environment.ImagesURL;
  profileImage: string | File;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private catService: CategoryService,
    private profileService: ProfileService
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
  }

  onLogout() {
    this.profileService.setProfileAfterAuth({});
    this.navCtrl.navigateBack("/auth");
    this.profileName = "Guest";
    this.profileImage = "";
  }
}
