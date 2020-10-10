import { Injectable } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";
import { take, tap, switchMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Profile } from "./profile.model";
import { environment } from "../../environments/environment";
import { StorageService } from "../farm-core/localstorage/storage-service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  BaseURL = environment.BaseURL;
  private _profile = new ReplaySubject<Profile>(1); // profile will set on the auth, other sub will get later when they subscribe
  profileEditAdd: Observable<Profile>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    //fetch from local storage to get logged in user data in refresh and clear the same on logout..
  }

  get profile(): Observable<Profile> {
    return this._profile.asObservable();
  }

  setProfileAfterAuth(profile: Profile | any) {
    this.storageService.setStorageData({
      key: "loggedInUserProfile",
      value: JSON.stringify(profile),
    });

    if (profile.address && typeof profile.address !== "object") {
      profile.address = JSON.parse(profile.address);
    }

    return this._profile.next({ ...profile });
  }

  addEditProfile(profileData: Profile): Observable<any> {
    let _id = profileData._id;
    let formData = new FormData();
    let avatar_url;
    let profileUpdated: any = {};
    formData.append("address", JSON.stringify(profileData.address));

    for (const key in profileData) {
      if (typeof profileData[key] !== "object") {
        formData.append(key, profileData[key]);
      }
    }

    //append the image only in case add or dirty in edit..
    if (profileData["avatar"] && typeof profileData["avatar"] !== "string") {
      formData.append(
        "profile_image",
        profileData["avatar"],
        new Date().getTime() + ".png"
      );
    }

    if (_id) {
      this.profileEditAdd = this.http.put<Profile>(
        `${this.BaseURL}v1/user/${_id}`,
        formData
      );
    } else {
      this.profileEditAdd = this.http.post<any>(
        `${this.BaseURL}v1/user`,
        formData
      );
    }
    return this.profileEditAdd.pipe(
      take(1),
      tap((resData: any) => {
        formData.set("_id", resData._id);
        formData.set("avatar", avatar_url);
        formData.forEach((value, key) => {
          profileUpdated[key] = value;
        });
        profileUpdated.avatar = resData.avatar;
        profileUpdated.address = profileData.address;
        this._profile.next(profileUpdated);
      })
    );
  }
}
