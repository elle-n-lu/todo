import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { UserStatusService } from "./signin/userStatus.service";
import { UserParams } from "./test/user-params";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
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
      const user: UserParams = JSON.parse(localStorage.getItem("userinfo"));
      if (user.isadmin) {
        return true;
      } else {
        return this.router.parseUrl("/");
      }
    } else {
      return this.router.parseUrl("/");
    }
  }
}


