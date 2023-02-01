import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { UserParams } from "./user-params";
import { UserService } from "./user.service";
import { takeUntil } from "rxjs/operators";
import { UserStatusService } from "../signin/userStatus.service";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent {
  // private subscription: Subscription;
   userStatus: string 
  @ViewChild("test") public test: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private userStatusService: UserStatusService
  ) {}

  private _userList: UserParams[] = []; // all todo items

  public get users(): Readonly<UserParams[]> {
    return this._userList;
  }

  private _getUserListDestroyed$: Subject<UserParams[]> = new Subject();

  private _signInDestroyed$: Subject<UserParams> = new Subject();
  private _signOutDestroyed$: Subject<UserParams> = new Subject();

  ngOnInit(): void {
    // this.getUserList(); // peform users DB reading
    this.userStatusService.getUser().subscribe((data)=>{
      // this.userStatus = data
      console.log('userstatus', this.userStatus, data)
    })
  }

  ngOnDestroy(): void {
    this._getUserListDestroyed$.complete();
    this._signInDestroyed$.complete();
    this._signOutDestroyed$.complete();
  }

  getUserList(): UserParams[] {
    this.userService
      .getUserList()
      .pipe(takeUntil(this._getUserListDestroyed$))
      .subscribe((users) => {
        this._userList = users;
      });
    return this._userList;
  }
}
