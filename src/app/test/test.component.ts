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
  //change banner user status
  userStatus: UserParams;

  constructor(
    private userStatusService: UserStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStatusService.getUser().subscribe((data) => {
      this.userStatus = data;
    });
    if (localStorage.getItem("userinfo")) {
      this.userStatus = JSON.parse(localStorage.getItem("userinfo"));
    }
  }

  logOut() {
    localStorage.setItem("userinfo", "");
    this.userStatusService.setUser(null);
    this.router.navigate(["/"]);
    location.reload();
  }
}
