import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isuser_authenticated = true;
  private _is_admin = true;

  constructor() { }

  get is_admin() {
    return this._is_admin;
  }

  get isuser_authenticated() {
    return this._isuser_authenticated;
  }

  login() {
    this._isuser_authenticated = true;
  }

  logout() {
    this._isuser_authenticated = false;
  }

}
