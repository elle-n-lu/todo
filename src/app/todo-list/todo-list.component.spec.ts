import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { TodoListComponent } from "./todo-list.component";
import { TodoService } from "./todo.service";
import { GoogleObj } from "./translateType";

const todoItem = {
  description: "hello",
};

const translateItem = {
  id: 1,
  description: "hello",
  userid: 5,
};

const transObj: GoogleObj = {
  q: "hello",
  target: "es",
};

const justTranslate = "hola";

const translateAfter = {
  id: 1,
  iscompleted: true,
  completedon: new Date(),
  description: "hola",
  userid: 5,
};

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const todoServiceSpy = jasmine.createSpyObj<TodoService>([
    "addTodoItem",
    "translate",
    "translateChange",
  ]);
  const toastrServiceSpy = jasmine.createSpyObj<ToastrService>(['success'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [{ provide: TodoService, useValue: todoServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });
  it("should show toast success",()=>{
    toastrServiceSpy.success('succeed to add item')
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('succeed to add item')
  })
  it("should add a todo item", () => {
    todoServiceSpy.addTodoItem.and.returnValue(of(translateItem));
    todoServiceSpy.addTodoItem(todoItem).subscribe((todo) => {
      expect(todo).toEqual(translateItem);
    });
  });

  it("should only translate a todo item", () => {
    todoServiceSpy.translate.and.returnValue(of(justTranslate));
    todoServiceSpy.translate(transObj).subscribe((res) => {
      expect(res).toEqual(justTranslate);
    });
  });

  it("should translate and save the translate state bind with user", () => {
    const id: number = 1;
    todoServiceSpy.translateChange.and.returnValue(of(translateAfter));
    todoServiceSpy.translateChange(id).subscribe((res) => {
      expect(res).toEqual(translateAfter);
    });
  });

  it("should reset input area", () => {
    const after = {
      description: "",
      todoTranslated: "",
      languageCode: "es",
      errorsField: "",
    };
    expect(component.todo.description).toEqual(after.description)
    expect(component.todoTranslated).toMatch(after.todoTranslated);
    expect(component.language.code).toMatch(after.languageCode);
    expect(component.errors.field).toMatch(after.errorsField);
  });
});
