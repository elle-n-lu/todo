import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { TodoItem } from "../todo-list/todo-item";
import { TodoService } from "../todo-list/todo.service";

import { TodohistoryComponent } from "./todohistory.component";

describe("TodohistoryComponent", () => {
  let component: TodohistoryComponent;
  let fixture: ComponentFixture<TodohistoryComponent>;
  let route: ActivatedRoute;
  const todoServiceSpy = jasmine.createSpyObj<TodoService>([
    "getTodoList",
    "deleteTodoItem",
  ]);
  const todoList: TodoItem[] = [
    {
      id: 1,
      completedon: new Date(),
      iscompleted: false,
      description: "hello",
      userid: 5,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodohistoryComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(TodohistoryComponent);
    component = fixture.componentInstance;
  });

  it("should get todolist", () => {
    route.params.subscribe(val=>{
      expect(val.id).toBe(1)
      todoServiceSpy.getTodoList.and.returnValue(of(todoList))
      todoServiceSpy.getTodoList(val.id).subscribe((res)=>{
        expect(res).toEqual(todoList)
     
      })
    })
  });

  it("should delete a todo item", () => {
      const id:number = 1
      todoServiceSpy.deleteTodoItem.and.returnValue(of({}))
      todoServiceSpy.deleteTodoItem(id).subscribe((res)=>{
        expect(res).toEqual({})
      })
  })
});
