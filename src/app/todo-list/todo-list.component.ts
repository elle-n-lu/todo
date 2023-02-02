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
  public todos$: TodoItem[]; // async list of Todo items
  userStatus: UserParams;
  public onAddEditComplete: Subject<void> = new Subject(); // the ajax complete result callback

  constructor(
    private todoService: TodoService,
    private userStatusService: UserStatusService,
    private router: Router
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

  public addTodoItem(todoItem: TodoItem): void {
    if (this.userStatus) {
      this.todoService
        .addTodoItem(todoItem)
        .pipe(takeUntil(this._addTodoItemDestroyed$))
        .subscribe((res) => {
          this.todo = {
            description: res[0].description,
            id: res[0].id,
            userid: res[0].userid,
          };
        });
    } else {
      alert("user login needed");
      this.router.navigate(["/signIn"]);
    }
  }

  getValue(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }

  cancelAdd(): void {
    this.todo = { description: "" };
    this.todoTranslated = "";
    this.language.code = "es";
  }

  // public deleteTodoItem(todoId: number): void {
  //   this.todoService
  //     .deleteTodoItem(todoId)
  //     .pipe(takeUntil(this._deleteTodoItemDestroyed$))
  //     .subscribe(() => {
  //       const index = this._todoList.findIndex((t) => t.id === todoId);

  //       if (index !== -1) {
  //         this._todoList.splice(index, 1); // hard remove the todo item
  //       }
  //     });
  // }

  setChange() {
    this.language;
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
