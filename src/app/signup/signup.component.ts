import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserParams } from "../test/user-params";
import { UserService } from "../test/user.service";

export interface errors {
  field: string;
  message: string;
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errors: errors = { field: "", message: "sadsadasd" };

  constructor(private userService: UserService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }
  private _signUpDestroyed$: Subject<any> = new Subject();

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._signUpDestroyed$.complete();
  }
  //can be ignored
  get f() {
    return this.signupForm.controls;
  }
  signUp(user: UserParams): void {
    if (!user.name) {
      this.errors = { field: "name", message: "name required" };
    } else if (!user.email) {
      this.errors = { field: "email", message: "email requiredt" };
    } else if (!user.password) {
      this.errors = { field: "password", message: "password required" };
    } else {
      this.userService
        .signUp(user)
        .pipe(takeUntil(this._signUpDestroyed$))
        .subscribe(
          (res) => {
            this.errors = { field: "", message: "" };
            this.router.navigate(["/signIn"]);
          },
          (err) => {
            if ((err.error as string).includes("unique_user")) {
              this.errors = { field: "name", message: "name already exist" };
            }

            if ((err.error as string).includes("unique_email")) {
              this.errors = { field: "email", message: "email already exist" };
            }
          }
        );
    }
  }
}
