import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
  ) {}
  private _signInDestroyed$: Subject<any> = new Subject();
  
  ngOnInit(): void {
    this.signinForm = new FormGroup({
      name: new FormControl("", Validators.required),
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
          //use service to store and pass user info
          this.userStatusService.setUser({
            email: res[0].email,
            name: res[0].name,
            password: res[0].password,
            id: res[0].id,
            isadmin: res[0].isadmin,
          });
          //use localtorage to save userinfo and reducer to change state
          localStorage.setItem(
            "userinfo",
            JSON.stringify({
              email: res[0].email,
              name: res[0].name,
              password: res[0].password,
              id: res[0].id,
              isadmin: res[0].isadmin,
            })
          );
          if(res[0].isadmin){
            this.router.navigate(["/users-history"]);
          }else{

            this.router.navigate(["/"]);
          }
        },
        (err) => {
          if (err.error.field==="nameOrEmail") {
            this.errors = { field: "nameOrEmail", message: "username or email not correct" };
          }
          if (err.error.field==="password") {
            this.errors = { field: "password", message: "password not correct" };
          }
        }
      );
  }
}
