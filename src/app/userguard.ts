import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserStatusService } from "./signin/userStatus.service";
@Injectable({
    providedIn: "root",
  })
export class UserGuard implements CanActivate {
    constructor(private authService: UserStatusService, private router: Router) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): true | UrlTree {
      const url: string = state.url;
  
      return this.checkLogin(url);
    }
    checkLogin(url: string): true | UrlTree {
      if (localStorage.getItem("userinfo")) {
        return this.router.parseUrl("/");
      } else {
        return true;
      }
    }
  }