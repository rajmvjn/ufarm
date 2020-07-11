import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isuser_authenticated = true;

  constructor() { }

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
