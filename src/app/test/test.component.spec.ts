import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { SigninComponent } from "../signin/signin.component";
import { UserStatusService } from "../signin/userStatus.service";
import { TestComponent } from "./test.component";

const userStatus = {
  id: 5,
  email: "mi@mi.com",
  password: "aedwed232432rsda",
  name: "mimi",
  isadmin: false,
};
describe("TestComponent", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const userStatusServiceSpy = jasmine.createSpyObj<UserStatusService>([
    "getUser","setUser"
  ]);

  const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        { path: 'signIn', component: SigninComponent }
       ])
     ],
      declarations: [TestComponent],
      providers: [
        { provide: UserStatusService, useValue: userStatusServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it("should initialize user status", () => {
    expect(component.userStatus).toBeUndefined;
    userStatusServiceSpy.getUser.and.returnValue(of(userStatus));
    component.ngOnInit();
    expect(component.userStatus).toEqual(userStatus);
    fixture.detectChanges();

    const avatarbtn = fixture.debugElement.nativeElement.querySelector('#avartart-name')
    expect(avatarbtn.innerHTML).toContain(userStatus.name[0].toLocaleUpperCase())
  });

  it("should setuser be called", fakeAsync(() => {
    const userstate = null;
    userStatusServiceSpy.setUser(null)
    expect(userStatusServiceSpy.setUser).toHaveBeenCalled()
    expect(userstate).toBeNull();
    expect(routerSpy.navigate).toBeDefined();
    routerSpy.navigate("/");
    expect(routerSpy.navigate).toHaveBeenCalled();
    const navArgs = routerSpy.navigate.calls.first().args[0] as string;
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toContain("/");

  }));
});
