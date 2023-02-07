import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { UserService } from "../test/user.service";

import { SigninComponent } from "./signin.component";
import { UserStatusService } from "./userStatus.service";

const user = {
  id: 5,
  email: "mi@mi.com",
  password: "aedwed232432rsda",
  name: "mimi",
  isadmin: false,
};
describe("SigninComponent", () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  const userServiceSpy = jasmine.createSpyObj<UserService>(["signIn"]);
  const userStatusServiceSpy = jasmine.createSpyObj<UserStatusService>([
    "setUser",
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: UserStatusService, useValue: userStatusServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
});

it("should signin", fakeAsync(() => {
    userServiceSpy.signIn.and.returnValue(of(user))
      fixture.detectChanges();
    expect(component).toBeTruthy();
  }));


  it("should set user login state", ()=>{
    userStatusServiceSpy.setUser(user)
    fixture.detectChanges();
    expect(component).toBeTruthy()

  })
});

