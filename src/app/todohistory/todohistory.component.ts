import {
  Component, OnDestroy,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TodoItem } from "../todo-list/todo-item";
import { TodoService } from "../todo-list/todo.service";

@Component({
  selector: "app-todohistory",
  templateUrl: "./todohistory.component.html",
  styleUrls: ["./todohistory.component.scss"],
})
export class TodohistoryComponent implements OnInit, OnDestroy {
  _todolist: TodoItem[] = [];
  id: number;
  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}
  private _deleteTodoItemDestroyed$: Subject<TodoItem> = new Subject();
  private _getTodoListDestroyed$: Subject<TodoItem[]> = new Subject();

  ngOnInit(): void {
    this.router.queryParams.subscribe((val) => {
      this.getTodoList(val.id);
    });
  }

  ngOnDestroy(): void {
    this._deleteTodoItemDestroyed$.complete();
    this._getTodoListDestroyed$.complete();
  }

  getTodoList(id: number) {
    this.todoService
      .getTodoList(id)
      .pipe(takeUntil(this._getTodoListDestroyed$))
      .subscribe((res) => {
        this._todolist = res;
      });

    return this._todolist;
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodoItem(id)
      .pipe(takeUntil(this._deleteTodoItemDestroyed$))
      .subscribe(() => {
        location.reload();
      });
  }
}
