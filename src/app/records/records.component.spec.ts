import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { UserService } from "../test/user.service";
import { Location } from "@angular/common";
import { RecordsComponent } from "./records.component";
import { Route, Router } from "@angular/router";
import { TodohistoryComponent } from "../todohistory/todohistory.component";
import { By } from "@angular/platform-browser";
const userList = [
  {
    id: 5,
    email: "mi@mi.com",
    password: "aedwed232432rsda",
    name: "mimi",
    isadmin: false,
  },
];

describe("RecordsComponent", () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  const userServiceSpy = jasmine.createSpyObj<UserService>(["getUserList"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "use/:id", component: TodohistoryComponent },
        ]),
      ],
      declarations: [RecordsComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
  });

  it("should getuserlist() be called && click button to navigate", () => {
    userServiceSpy.getUserList.and.returnValue(of(userList));
    component.ngOnInit();
    fixture.detectChanges();
    expect(userServiceSpy.getUserList).toHaveBeenCalled();

    const location = TestBed.inject(Location);

    const butn = fixture.debugElement.query(By.css("button"));
    butn.nativeElement.click();
    const route = TestBed.inject(Router);
    route.navigate(["/use/1"]).then(() => {
      expect(location.path()).toBe("/use/1");
    });
  });
});
