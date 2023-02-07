import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { UserStatusService } from "../signin/userStatus.service";

import { TestComponent } from "./test.component";
import { UserService } from "./user.service";

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
    "getUser",
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: UserStatusService, useValue: userStatusServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it("should get user login state", () => {
    userStatusServiceSpy.getUser.and.returnValue(of(userStatus));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it("should get user logout",fakeAsync(()=>{
    const userstate = null
    expect(userstate).toBeNull()
  }))
});
