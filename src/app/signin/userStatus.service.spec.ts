import { HttpClient } from "@angular/common/http";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { UserStatusService } from "./userStatus.service";

describe("userStatusService", () => {
  let service: UserStatusService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserStatusService] });
    service = TestBed.inject(UserStatusService);
  });

  it("should get user state", () => {
    const expectUser = {
      id: 5,
      name: "mimi",
      email: "mi@mi.com",
      password: "aedwed232432rsda",
      isadmin: false,
    };
    spyOn(service, "getUser").and.returnValue(of(expectUser));

    service.getUser().subscribe((res) => {
      expect(res).toEqual(expectUser);
    });
  });

  it("should set user state", () => {
    const inpuvalue = {
      name: "mimi",
      password: "123",
    };
    spyOn(service, "setUser").and.callThrough();
    service.setUser(inpuvalue);
    expect(service.setUser).toHaveBeenCalled();
  });
});
