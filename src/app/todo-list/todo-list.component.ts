import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { errors } from "../signup/signup.component";
import { UserParams } from "../test/user-params";
import { TodoItem } from "./todo-item";
import { TodoService } from "./todo.service";
import { GoogleObj } from "./translateType";
export type languageParams = {
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
  constructor(
    private todoService: TodoService, 
    private toastr: ToastrService
  ) {}

  todo: TodoItem = { description: "" };

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
          this.toastr.success("succeed to add");
        },
        (err) => {
          if (err.error.field === "userid") {
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
        .subscribe(() => this.toastr.success("succeed to translate"));
    } else {
      this.todoService.translate(transObj).subscribe((res: any) => {
        this.todoTranslated = res.data.translations[0].translatedText;
      });
    }
  }
}
