import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { Profile } from "../../../profile/profile.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  BaseURL = environment.BaseURL;
  private _users = new BehaviorSubject<Profile[]>([]);
  editAddSub: Observable<Profile[]>;

  constructor(private http: HttpClient) {}

  fetchAllUsers() {
    return this.http.get<Profile[]>(`${this.BaseURL}v1/users`).pipe(
      take(1),
      tap((users) => {
        this._users.next(users);
      })
    );
  }

  /*
   * method to add or updated user profile from admin account..
   */
  addOrUpdateUser(user: Profile) {
    console.log(user);
    let new_id = null;
    if (user._id) {
      this.editAddSub = this.http.put<Profile[]>(
        `${this.BaseURL}v1/user/${user._id}`,
        user
      );
    } else {
      this.editAddSub = this.http.post<any>(`${this.BaseURL}v1/user`, user);
    }

    return this.editAddSub.pipe(
      take(1),
      switchMap((resData: any) => {
        new_id = resData._id;
        return this._users;
      }),
      take(1),
      tap((users) => {
        if (user._id) {
          //edit user by admin
          users.map((userprofile, index) => {
            if (userprofile._id === user._id) {
              users[index] = { ...userprofile };
              console.log(users[index]);
            }
          });
          this._users.next(users);
        } else {
          user._id = new_id;
          this._users.next(users.concat(user));
        }
      })
    );
  }
}
