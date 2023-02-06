import { Component } from "@angular/core";
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
  _todoList: TodoItem[] = []; //all todo items
  show: boolean = false;
  id: number = 0;
  private _getUserListDestroyed$: Subject<UserParams[]> = new Subject();
  private _getTodoListDestroyed$: Subject<TodoItem[]> = new Subject();
  private _deleteTodoItemDestroyed$: Subject<TodoItem> = new Subject()

  constructor(
    private todoService: TodoService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getUserList();
  }
  ngOnDestroy(): void {
    this._getUserListDestroyed$.complete();
    this._getTodoListDestroyed$.complete();
    this._deleteTodoItemDestroyed$.complete()
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

  getTodoList(id: number) {
    this.todoService
      .getTodoList(id)
      .pipe(takeUntil(this._getTodoListDestroyed$))
      .subscribe((res) => {
        this._todoList = res;
      });

    this.show = !this.show;
  }

  deleteTodo(id:number){
    this.todoService.deleteTodoItem(id).pipe(takeUntil(this._deleteTodoItemDestroyed$))
    .subscribe(()=>{
      console.log('removed')
    })
 
  }

}
