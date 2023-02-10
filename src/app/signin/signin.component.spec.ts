import { HttpClientModule } from "@angular/common/http";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of } from "rxjs";
import { UserService } from "../test/user.service";

import { SigninComponent } from "./signin.component";
import { UserStatusService } from "./userStatus.service";

const user = {
  id: 5,
  password: "aedwed232432rsda",
  name: "mimi",
  email: "mi@mi.com",
  isadmin: false,
};

describe("SigninComponent", () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  const userServiceSpy = jasmine.createSpyObj<UserService>(["signIn"]);
  const userStatusServiceSpy = jasmine.createSpyObj<UserStatusService>([
    "setUser",
  ]);
  const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SigninComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: UserStatusService, useValue: userStatusServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
  });

  const updateform = (name, password) => {
    component.signinForm.controls["name"].setValue(name);
    component.signinForm.controls["password"].setValue(password);
  };

  it("Component successfully created", () => {
    expect(component).toBeTruthy();
  });

  it("component initial state", () => {
    expect(component.signinForm).toBeDefined();
  });

  it("form value should update from when u change the input", () => {
    updateform(user.name, user.password);
    const expectUser = {
      name: "mimi",
      password: "aedwed232432rsda",
    };
    expect(component.signinForm.value).toEqual(expectUser);
  });

  it("should created a form with username and password input and signin button", () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector(
      "#username-container"
    );
    const passwordContainer = fixture.debugElement.nativeElement.querySelector(
      "#password-container"
    );
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector(
      "#login-btn-container"
    );
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });
  it("When username is blank, username field should display red outline ", () => {
    const blankuser = { user: "" };
    updateform(blankuser.user, user.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll("input");
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain("ng-invalid");
  });
  it("When password is blank, password field should display red outline ", () => {
    const blankUser = { password: "" };
    updateform(user.name, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();
    const inputs = fixture.debugElement.nativeElement.querySelectorAll("input");
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain("ng-invalid");
  });
  it("userService signin() should called ", fakeAsync(() => {
    updateform(user.name, user.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    tick();
    fixture.detectChanges();
    userServiceSpy.signIn.and.returnValue(of(user));
    expect(userServiceSpy.signIn).toHaveBeenCalled();
  }));

  it("should route to home if login successfully", fakeAsync(() => {
    updateform(user.name, user.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    advance(fixture);
    userServiceSpy.signIn.and.returnValue(of(user));
    advance(fixture);
    expect(routerSpy.navigate).toBeDefined();
    routerSpy.navigate("/users-history");
    expect(routerSpy.navigate).toHaveBeenCalled();
    const navArgs = routerSpy.navigate.calls.first().args[0] as string;
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toContain("/");
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
