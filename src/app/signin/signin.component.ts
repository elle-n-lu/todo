import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
    private userStatusService: UserStatusService
  ) {}
  private _signInDestroyed$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      nameOrEmail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  ngOnDestroy(): void {
    this._signInDestroyed$.complete();
  }

  signIn(user: UserParams): void {
    this.userService
      .signIn(user)
      .pipe(takeUntil(this._signInDestroyed$))
      .subscribe(
        (res) => {
          // this._userList.push(new UserParams( user.name, user.email, user.password, user.id))
          console.log("res signIn", res);
          this.errors = { field: "", message: "" };
          
          this.userStatusService.setUser(this.user.name)
        },
        (err) => {
          console.log("err", err.error as string);
          if ((err.error as string).includes("unique_user")) {
            this.errors = {
              field: "nameOrEmail",
              message: "name already exist",
            };
          }
          if ((err.error as string).includes("unique_email")) {
            this.errors = { field: "email", message: "email already exist" };
          }
        }
      );
  }

  onStatusChange(){
  }
}
