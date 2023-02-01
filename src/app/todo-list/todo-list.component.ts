import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TodoItem } from "./todo-item";
import { TodoService } from "./todo.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  public todos$: TodoItem[]; // async list of Todo items
 
  public onAddEditComplete: Subject<void> = new Subject(); // the ajax complete result callback

  public get todos(): Readonly<TodoItem[]> {
    return this._todoList;
  }
   todo: TodoItem = {description:''}
  private _todoList: TodoItem[]  = []; // all todo items

  private _getTodoListDestroyed$: Subject<TodoItem[]> = new Subject();
  private _deleteTodoItemDestroyed$: Subject<any> = new Subject();
  private _addTodoItemDestroyed$: Subject<TodoItem> = new Subject();
  private _editTodoItemDestroyed$: Subject<TodoItem> = new Subject();

  constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
    this.getTodoList(); // peform todos DB reading
  
  }

  public ngOnDestroy(): void {
    this._getTodoListDestroyed$.complete();
    this._addTodoItemDestroyed$.complete();
    this._editTodoItemDestroyed$.complete();
    this._deleteTodoItemDestroyed$.complete();
  }

  public getTodoList(): void {
    this.todoService
      .getTodoList()
      .pipe(takeUntil(this._getTodoListDestroyed$))
      .subscribe((todos) => {
        
        this._todoList = todos;
      });
  }
  
    public addTodoItem(todoItem: TodoItem): void {
      this.todoService
        .addTodoItem(todoItem)
        .pipe(takeUntil(this._addTodoItemDestroyed$))
        .subscribe((res) => {
          this._todoList .push(new TodoItem(todoItem.description));
        console.log('res', this._todoList, res )
        });
    }

    getValue(e: Event):string{
      console.log('e',(e.target as HTMLInputElement).value )
      return (e.target as HTMLInputElement).value
    }

    cancelAdd():void{
      this.todo = {description:''}
    }
  public deleteTodoItem(todoId: number): void {
    this.todoService
      .deleteTodoItem(todoId)
      .pipe(takeUntil(this._deleteTodoItemDestroyed$))
      .subscribe(() => {
        const index = this._todoList.findIndex((t) => t.id === todoId);

        if (index !== -1) {
          this._todoList.splice(index, 1); // hard remove the todo item
        }
      });
  }


}
