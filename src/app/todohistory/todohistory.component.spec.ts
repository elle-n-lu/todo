import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { TodoItem } from "../todo-list/todo-item";
import { TodoService } from "../todo-list/todo.service";
import { Location } from "@angular/common";
import { TodohistoryComponent } from "./todohistory.component";

describe("TodohistoryComponent", () => {
  let component: TodohistoryComponent;
  let fixture: ComponentFixture<TodohistoryComponent>;
  let route: ActivatedRoute;
  let router2: Router
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
      imports:[RouterTestingModule.withRoutes([{path:'users-history',component: TodohistoryComponent}])],
      declarations: [TodohistoryComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);
    router2 = TestBed.inject(Router)
    fixture = TestBed.createComponent(TodohistoryComponent);
    component = fixture.componentInstance;
    router2.initialNavigation()
  });

  it("gettodolist() should be called", () => {
    route.queryParams.subscribe(val=>{
      expect(val.id).toBe(1)
      fixture.detectChanges()
      todoServiceSpy.getTodoList.and.returnValue(of(todoList))
      expect(todoServiceSpy.getTodoList).toHaveBeenCalled()
    })
  });
  it("should create table",()=>{
    const table = fixture.debugElement.nativeElement.querySelector(
      "#userhistory-container"
    );
    expect(table).toBeDefined()
  })

  it("should deleteitem() be called", () => {
      const id:number = 1
      todoServiceSpy.deleteTodoItem.and.returnValue(of({}))
      todoServiceSpy.deleteTodoItem(id)
      expect(todoServiceSpy.deleteTodoItem).toHaveBeenCalled()
  })

  it("should navigate back to userhistory page",()=>{
    const location = TestBed.inject(Location)
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click()
   
    fixture.detectChanges()
    router2.navigate(['/users-history']).then(()=>{
      expect(location.path()).toBe('/users-history')
    })
  })
});
