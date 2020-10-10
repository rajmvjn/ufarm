import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import constants from "../farm-core/constants/constants";
import { environment } from "../../environments/environment";
import { StorageService } from "../farm-core/localstorage/storage-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isuser_authenticated = false;
  base_url = environment.BaseURL;
  private _user_role_sub = new BehaviorSubject<string>(
    constants.USER_ROLE.guest
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  set user_role_sub(role: string) {
    this._user_role_sub.next(role);
  }

  get get_user_role_sub() {
    return this._user_role_sub;
  }

  get isuser_authenticated() {
    return this._isuser_authenticated;
  }

  set isuser_authenticated(status: boolean) {
    this._isuser_authenticated = status;
  }

  login(formData: any) {
    return this.http.post(`${this.base_url}v1/auth`, formData);
  }

  logout() {
    this.isuser_authenticated = false;
    this.storageService.removeStorageData({ key: "loggedInUserProfile" });
  }

  skipLogin() {
    this.user_role_sub = constants.USER_ROLE.guest;
    return of(true);
  }
}
