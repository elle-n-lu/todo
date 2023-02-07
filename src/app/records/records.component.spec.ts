import { HttpClient } from "@angular/common/http";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { UserService } from "../test/user.service";
import { TodoItem } from "../todo-list/todo-item";
import { TodoService } from "../todo-list/todo.service";

import { RecordsComponent } from "./records.component";
const userList = [
  {
    id: 5,
    email: "mi@mi.com",
    password: "aedwed232432rsda",
    name: "mimi",
    isadmin: false,
  },
];
const todoList: TodoItem[] = [
  {
    id: 1,
    completedon: new Date(),
    iscompleted: false,
    description: "hello",
    userid: 5,
  },
];
describe("RecordsComponent", () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  const todoServiceSpy = jasmine.createSpyObj<TodoService>(["getTodoList","deleteTodoItem"]);
  const userServiceSpy = jasmine.createSpyObj<UserService>(["getUserList"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TodoService, useValue: todoServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
  });

  it("should get userlist", () => {
    userServiceSpy.getUserList.and.returnValue(of(userList));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should get todolist", fakeAsync(() => {
    const id:number = 5
    todoServiceSpy.getTodoList.and.returnValue(of(todoList));
    todoServiceSpy.getTodoList(id).subscribe((res)=>{

      expect(res).toEqual(todoList);
    })
  }));

  it("should delete a todo item", fakeAsync(() => {
    const id:number = 1
    todoServiceSpy.deleteTodoItem.and.returnValue(of({}))
    todoServiceSpy.deleteTodoItem(id).subscribe((res)=>{
      expect(res).toEqual({})
    })
  }))
});
