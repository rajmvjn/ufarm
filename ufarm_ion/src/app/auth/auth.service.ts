import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import constants from "../farm-core/constants/constants";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isuser_authenticated = false;
  private _user_role = constants.USER_ROLE.guest;

  base_url = environment.BaseURL;

  constructor(private http: HttpClient) {}

  get user_role() {
    return this._user_role;
  }

  set user_role(role: string) {
    this._user_role = role;
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
  }

  skipLogin() {
    this._user_role = constants.USER_ROLE.guest;
    return of(this._user_role);
  }
}
