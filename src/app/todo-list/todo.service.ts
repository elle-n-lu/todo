import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
// import { HandleError, HttpErrorHandler } from "../shared/http-error-handler.service";
import { TodoItem } from "./todo-item";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private handleError: HandleError; // for general error handling (can be improved)
  private todoBaseUrl = `${environment.apiUrl}/tasks`;  // URL to todo api   
  constructor(private http: HttpClient){}
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  
  public getTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.todoBaseUrl}/gettasks`)
      .pipe(
        map((todos: any) => {
          console.log('axios todos',todos)
          let todoList: TodoItem[] = todos.map((s: TodoItem)=>{return s}); // map to UI format for todos (case data has inconsistency for 'done' property)
          return todoList;
        }),
        catchError(this.handleError)
      );
  }

  public addTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http
      .post<TodoItem>(`${this.todoBaseUrl}/createtask`, {
       
        description: todoItem.description,
       
      })
      // .pipe(
      //   catchError(this.handleError('addTodoItem', [])),
      //   map(()=>console.log(this)));
  }
  public deleteTodoItem(todoId: number): any {
    return this.http
      .delete<TodoItem>(`${this.todoBaseUrl}/deletetask/${todoId}`)
      .pipe(catchError(this.handleError));
  }
}
