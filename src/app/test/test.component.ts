import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserStatusService } from "../signin/userStatus.service";
import { UserParams } from "./user-params";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent {
  //this component is to show the signin/up button, check login status and change the banner UI
  //change banner user status
  userStatus: UserParams;

  constructor(
    private userStatusService: UserStatusService,
    private router: Router
  ) {}
  //when the component load, check and change the user status immeially 
  ngOnInit(): void {
    this.userStatusService.getUser().subscribe((data) => {
      this.userStatus = data;
    });
    if (localStorage.getItem("userinfo")) {
      this.userStatus = JSON.parse(localStorage.getItem("userinfo"));
    }
  }
  //clear localstorage user info also use service to change login user to null
  logOut() {
    localStorage.setItem("userinfo", "");
    this.userStatusService.setUser(null);
    this.router.navigate(["/"]);
    location.reload();
  }
}
