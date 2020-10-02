import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import constants from "../farm-core/constants/constants";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authService.user_role === constants.USER_ROLE.admin &&
      !this.authService.isuser_authenticated
    ) {
      //admin should be logged in user..
      this.router.navigateByUrl("/auth");
      return false;
    }
    return true;
  }
}
