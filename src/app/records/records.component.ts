import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserParams } from "../test/user-params";
import { UserService } from "../test/user.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"],
})
export class RecordsComponent {
  _userList: UserParams[] = []; // all users
  private _getUserListDestroyed$: Subject<UserParams[]> = new Subject();

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.getUserList();
  }
  ngOnDestroy(): void {
    this._getUserListDestroyed$.complete();
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
