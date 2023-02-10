import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../test/user.service';

import { SignupComponent } from './signup.component';
const user = {name:'mi',email:'mi@mi.com',password:'123'}
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const userServiceSpy = jasmine.createSpyObj<UserService>(["signUp"]);
  const routerSpy = jasmine.createSpyObj('Router',['navigate'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ SignupComponent ],
      providers:[{ provide: UserService, useValue: userServiceSpy },{provide: Router, useValue: routerSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });
  const updateform = (name,email, password) => {
    component.signupForm.controls["name"].setValue(name);
    component.signupForm.controls["email"].setValue(email)
    component.signupForm.controls["password"].setValue(password);
  };
  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.signupForm).toBeDefined()
  })

  it('form value should update from when u change the input', (() => {
    updateform(user.name,user.email, user.password);
    const expectUser = {
      name: "mi",
      email:"mi@mi.com",
      password: '123'
    }
    expect(component.signupForm.value).toEqual(expectUser);
  }));

  it("should created a form with username and password input and signup button", () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector(
      "#username-container"
    );
    const passwordContainer = fixture.debugElement.nativeElement.querySelector(
      "#password-container"
    );
    const emailContainer = fixture.debugElement.nativeElement.querySelector(
      "#email-container"
    );
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector(
      "#signup-btn-container"
    );
    expect(usernameContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it("When username is blank, username field should display red outline ", () => {
    const blankuser = { user: "" };
    updateform(blankuser.user,user.email, user.password);
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
    updateform(user.name,user.email, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll("input");
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain("ng-valid");
  });
  it("loginService signin() should called ", fakeAsync(() => {
    updateform(user.name,user.email, user.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    tick();
    fixture.detectChanges();
    userServiceSpy.signUp.and.returnValue(of(user));
    expect(userServiceSpy.signUp).toHaveBeenCalled();
  }));

  it("should route to home if login successfully", fakeAsync(() => {
    updateform(user.name,user.email, user.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    advance(fixture);
    userServiceSpy.signUp.and.returnValue(of(user));
    advance(fixture);
    expect(routerSpy.navigate).toBeDefined();
    routerSpy.navigate("/signIn");
    expect(routerSpy.navigate).toHaveBeenCalled();
    const navArgs = routerSpy.navigate.calls.first().args[0] as string;
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toContain("/signIn");
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
