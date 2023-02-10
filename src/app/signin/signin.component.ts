import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { errors } from "../signup/signup.component";
import { UserParams } from "../test/user-params";
import { UserService } from "../test/user.service";
import { UserStatusService } from "./userStatus.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent {
  signinForm: FormGroup;
  errors: errors = { field: "", message: "sadsadasd" };
  user: UserParams;
  constructor(
    private userService: UserService,
    private userStatusService: UserStatusService,
    private router: Router
  ) {
    this.signinForm = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  private _signInDestroyed$: Subject<any> = new Subject();

  ngOnInit(): void {}

  //can be ignored
  get f() {
    return this.signinForm.controls;
  }
  ngOnDestroy(): void {
    this._signInDestroyed$.complete();
  }

  signIn(signinData: UserParams): void {
    if (this.signinForm.invalid) {
      return;
    }
    const signinDataBody = {
      name: signinData.name,
      password: signinData.password,
    };

    this.userService
      .signIn(signinDataBody)
      .pipe(takeUntil(this._signInDestroyed$))
      .subscribe(
        (res) => {
          //use service to store and pass user info
          this.userStatusService.setUser({
            email: res.email,
            name: res.name,
            password: res.password,
            id: res.id,
            isadmin: res.isadmin,
          });
          //use localtorage to save userinfo and reducer to change state
          localStorage.setItem(
            "userinfo",
            JSON.stringify({
              email: res.email,
              name: res.name,
              password: res.password,
              id: res.id,
              isadmin: res.isadmin,
            })
          );
          if (res.isadmin) {
            this.router.navigate(["/users-history"]);
          } else {
            this.router.navigate(["/"]);
          }
        },
        (err) => {
          if (err.error.field === "nameOrEmail") {
            this.errors = {
              field: "nameOrEmail",
              message: "username or email not correct",
            };
          }
          if (err.error.field === "password") {
            this.errors = {
              field: "password",
              message: "password not correct",
            };
          }
        }
      );
  }
}
