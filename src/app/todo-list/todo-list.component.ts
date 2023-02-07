import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TodoItem } from "./todo-item";
import { TodoService } from "./todo.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserParams } from "../test/user-params";
import { UserStatusService } from "../signin/userStatus.service";
import { GoogleObj } from "./translateType";
import { Router } from "@angular/router";
import { errors } from "../signup/signup.component";
type languageParams = {
  code: string;
  language: string;
};

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  errors: errors = { field: "", message: "sadsadasd" };
  lang = new FormControl("en");
  languages: languageParams[] = [
    { code: "en", language: "English" },
    { code: "es", language: "Spanish" },
    { code: "de", language: "German" },
    { code: "ar", language: "Arabic" },
    { code: "ja", language: "Japanese" },
  ];
  language: languageParams = { code: "es", language: "Spanish" };
  todoTranslated: string = "";

  userStatus: UserParams;
  // public onAddEditComplete: Subject<void> = new Subject(); // the ajax complete result callback

  constructor(
    private todoService: TodoService // private userStatusService: UserStatusService,
  ) // private router: Router
  {}

  todo: TodoItem={description: ""}

  private _getTodoListDestroyed$: Subject<TodoItem[]> = new Subject();
  private _deleteTodoItemDestroyed$: Subject<any> = new Subject();
  private _addTodoItemDestroyed$: Subject<TodoItem> = new Subject();
  private _editTodoItemDestroyed$: Subject<TodoItem> = new Subject();
  private _translateChangeDestroyed$: Subject<TodoItem> = new Subject();

  public ngOnInit(): void {
    if (localStorage.getItem("userinfo")) {
      this.userStatus = JSON.parse(localStorage.getItem("userinfo"));

      this.todo = { description: "", userid: this.userStatus.id };
    }
  }

  public ngOnDestroy(): void {
    this._getTodoListDestroyed$.complete();
    this._addTodoItemDestroyed$.complete();
    this._editTodoItemDestroyed$.complete();
    this._deleteTodoItemDestroyed$.complete();
    this._translateChangeDestroyed$.complete();
  }
  getValue(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }

  public addTodoItem(todoItem: TodoItem): void {
    this.todoService
      .addTodoItem(todoItem)
      .pipe(takeUntil(this._addTodoItemDestroyed$))
      .subscribe(
        (res) => {
          this.todo = {
            description: res.description,
            id: res.id,
            userid: res.userid,
          };
        },
        (err) => {
          if (err.error.field === "userid") {
            // alert('login')
            this.errors = { field: "userid", message: "login needed" };
          }
          if (err.error.field === "description") {
            this.errors = {
              field: "description",
              message: "Forgot to enter something ?",
            };
          }
        }
      );
  }

  setChange() {
    this.language;
  }
  cancelAdd(): void {
    this.todo.description = "";
    this.todoTranslated = "";
    this.language.code = "es";
    this.errors.field = "";
  }

  translate(id: number): void {
    const transObj: GoogleObj = {
      q: this.todo.description,
      target: this.language.code,
    };

    if (this.todo.id) {
      this.todoService.translate(transObj).subscribe((res: any) => {
        this.todoTranslated = res.data.translations[0].translatedText;
      });
      this.todoService
        .translateChange(id)
        .pipe(takeUntil(this._translateChangeDestroyed$))
        .subscribe((res) => console.log("translated"));
    } else {
      this.todoService.translate(transObj).subscribe((res: any) => {
        this.todoTranslated = res.data.translations[0].translatedText;
      });
    }
  }
}
