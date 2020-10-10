import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
import { Profile } from "../../profile/profile.model";
import { UsersService } from "../../shared/services/users/users.service";

@Component({
  selector: "app-seller-activation",
  templateUrl: "./seller-activation.page.html",
  styleUrls: ["./seller-activation.page.scss"],
})
export class SellerActivationPage implements OnInit {
  users: Profile[];
  imgBaseUrl = environment.ImagesURL;
  constructor(
    public userService: UsersService,
    private actionSheetCtrl: ActionSheetController,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.userService.fetchAllUsers().subscribe((users: Profile[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  onChangeFilter(event: CustomEvent) {
    this.users = this.users.filter((user) => user.name === event.detail.value);
  }

  onProfileUpdate(event: CustomEvent, id: string, sellUpdate: boolean) {
    const actionHeader = sellUpdate ? " Sell" : " Status";
    const EnableOrDisable = event.detail.checked ? "Enable" : "Disable";
    this.actionSheetCtrl
      .create({
        header: EnableOrDisable + actionHeader,
        buttons: [
          {
            text: EnableOrDisable,
            handler: () => {
              this.updateSell(id, event.detail.checked, sellUpdate);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });

    console.log(event.detail);
    console.log(id);
  }

  updateSell(id: string, sellorStatus: boolean, sellUpdate: boolean) {
    const profile = this.users.filter((user) => user._id === id);
    if (sellUpdate) {
      profile[0].sell = sellorStatus;
    } else {
      profile[0].status = sellorStatus;
    }

    this.userService
      .addOrUpdateUser(profile[0])
      .subscribe((resdata) => console.log(resdata));
  }
}
