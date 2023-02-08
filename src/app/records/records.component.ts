import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserParams } from "../test/user-params";
import { UserService } from "../test/user.service";
import { TodoItem } from "../todo-list/todo-item";
import { TodoService } from "../todo-list/todo.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"],
})
export class RecordsComponent {
  _userList: UserParams[] = []; // all users
  widthch: boolean = false;
  private _getUserListDestroyed$: Subject<UserParams[]> = new Subject();

  constructor(
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getUserList();
    
  }
  ngOnDestroy(): void {
    this._getUserListDestroyed$.complete();
    
  }
  widthChange() {
    this.widthch = true;
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
