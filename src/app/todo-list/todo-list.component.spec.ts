import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { TodoListComponent } from "./todo-list.component";
import { TodoService } from "./todo.service";
import { GoogleObj } from "./translateType";
import { languageParams } from "./todo-list.component";
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
const languages: languageParams[] = [
  { code: "en", language: "English" },
  { code: "es", language: "Spanish" },]
describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const todoServiceSpy = jasmine.createSpyObj<TodoService>([
    "addTodoItem",
    "translate",
    "translateChange",
  ]);
  const toastrServiceSpy = jasmine.createSpyObj<ToastrService>(["success"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [TodoListComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });
  it("should show toast success", () => {
    toastrServiceSpy.success("succeed to add item");
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      "succeed to add item"
    );
  });
  it("should create textarea and button", () => {
    const textareaTodo =
      fixture.debugElement.nativeElement.querySelector("#todoDescription");
    const translateTodo =
      fixture.debugElement.nativeElement.querySelector("#translateTodo");
    const addbtn = fixture.debugElement.nativeElement.querySelector("#add-btn");
    const translatebtn =
      fixture.debugElement.nativeElement.querySelector("#translatebtn");
    const resetbtn =
      fixture.debugElement.nativeElement.querySelector("#restbtn");

    expect(textareaTodo).toBeDefined();
    expect(translateTodo).toBeDefined();
    expect(addbtn).toBeDefined();
    expect(translatebtn).toBeDefined();
    expect(resetbtn).toBeDefined();
  });

  it("should show 'spanish' as option",()=>{
    component.languages = languages
    fixture.detectChanges()
    spyOn(component, "setChange")
    const select = fixture.debugElement.query(By.css('select')).nativeElement
    select.value = select.options[0].value
    component.setChange()
    expect(component.setChange).toHaveBeenCalled()
    expect(component.language.code).toBe('es')
  })
  it("should addtodo() be called", () => {
    todoServiceSpy.addTodoItem.and.returnValue(of(translateItem));
    todoServiceSpy.addTodoItem(todoItem)
    fixture.detectChanges()
    const addbtn = fixture.debugElement.nativeElement.querySelector("#add-btn");
    addbtn.click()
    expect(todoServiceSpy.addTodoItem).toHaveBeenCalled()
  })

  it("should translate() be called", () => {
    todoServiceSpy.translate.and.returnValue(of(justTranslate));
    todoServiceSpy.translate(transObj)
    fixture.detectChanges()
    const transbtn = fixture.debugElement.nativeElement.querySelector("#translatebtn");
    transbtn.click()
    expect(todoServiceSpy.translate).toHaveBeenCalled()
  })

  it("should translate and save the translate state bind with user", () => {
    const id: number = 1;
    todoServiceSpy.translateChange.and.returnValue(of(translateAfter));
    todoServiceSpy.translateChange(id)
    fixture.detectChanges()
    const transbtn = fixture.debugElement.nativeElement.querySelector("#translatebtn");
    transbtn.click()
    expect(todoServiceSpy.translateChange).toHaveBeenCalled()
  });

  it("should reset input area", () => {
    const after = {
      description: "",
      todoTranslated: "",
      languageCode: "es",
      errorsField: "",
    };
    expect(component.todo.description).toEqual(after.description);
    expect(component.todoTranslated).toMatch(after.todoTranslated);
    expect(component.language.code).toMatch(after.languageCode);
    expect(component.errors.field).toMatch(after.errorsField);
  });
});
