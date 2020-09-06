import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { take, tap, switchMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Profile } from "./profile.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  BaseURL = environment.BaseURL;
  private _profiles = new BehaviorSubject<Profile[]>([]);
  profileEditAdd: Observable<Profile>;

  constructor(private http: HttpClient) {}

  fetchAllProfiles() {
    return this.http.get<Profile[]>(`${this.BaseURL}v1/users`).pipe(
      take(1),
      tap((users) => {
        this._profiles.next(users);
      })
    );
  }

  get profiles() {
    return this._profiles.asObservable();
  }

  addEditProfile(profileData: Profile): Observable<any> {
    const {
      name,
      email,
      pincode,
      address,
      avatar,
      phone,
      sell,
      status,
      _id,
    } = profileData;

    const imgName = new Date().getTime() + ".png";
    const uploadData = new FormData();

    uploadData.append("name", name);
    uploadData.append("email", email);
    uploadData.append("pincode", pincode);
    uploadData.append("address", address);

    uploadData.append("phone", phone);

    if (typeof avatar !== "string") {
      // on edit if the image not changed then its the strin type loaded from server
      uploadData.append("profile_image", avatar, imgName);
      uploadData.append("avatar", "");
    }
    if (_id) {
      this.profileEditAdd = this.http.put<Profile>(
        `${this.BaseURL}v1/user/${_id}`,
        uploadData
      );
    } else {
      this.profileEditAdd = this.http.post<any>(
        `${this.BaseURL}v1/user`,
        uploadData
      );
    }
    return this.profileEditAdd.pipe(
      take(1),
      switchMap((resData) => {
        return this.profiles; // this witches to new observable, new observable returned after http observable
      }),
      take(1),
      tap((users) => {
        const profile = new Profile(
          name,
          phone,
          avatar,
          email,
          address,
          pincode,
          status,
          sell,
          _id
        );

        this._profiles.next(users.concat(profile));
      })
    );
  }

  getProfile(user_id: string): Observable<Profile> {
    return this.http.get(`${this.BaseURL}v1/user/${user_id}`).pipe(
      map((data) => {
        return {
          _id: data["_id"],
          email: data["email"],
          name: data["name"],
          avatar: `${environment.BaseURL}images/${data["avatar"]}`,
          phone: data["phone"],
          address: data["address"],
          pincode: data["pincode"],
          status: data["status"],
        };
      })
    );
  }

  deleteProfile(user_id: string) {
    return this.http.delete(`${this.BaseURL}v1/user/${user_id}`).pipe(
      take(1),
      switchMap((resData) => {
        return this.profiles;
      }),
      take(1),
      tap((users) => {
        this._profiles.next(users.filter((user) => user._id !== user_id));
      })
    );
  }
}
