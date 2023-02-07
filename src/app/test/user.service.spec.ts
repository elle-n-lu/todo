import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { UserParams } from "./user-params";
import { UserService } from "./user.service";

describe("userService", () => {
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "post"]);
    userService = new UserService(httpClientSpy);
  });

  it("should return user list", (done: DoneFn) => {
    const expectList = [
      {
        id: 5,
        email: "mi@mi.com",
        password: "aedwed232432rsda",
        name: "mimi",
        isadmin: false,
      },
    ];
    httpClientSpy.get.and.returnValue(of(expectList));
    userService.getUserList().subscribe(
      (res) => {
        expect(res).toEqual(expectList);
        done();
      },
      (err) => {}
    );
  });
  const expectUser = {
    id: 1,
    name: "mi",
    email: "mi@mi.com",
    password: "sfeww434321$%#",
    isadmin: false,
  };
  it("should signin and return user info", (done: DoneFn) => {
    const signinValues:UserParams = {
      name: "mi",
      password: "123",
    };

    httpClientSpy.post.and.returnValue(of(expectUser));
    userService.signIn(signinValues).subscribe(
      (res) => {
        expect(res).toEqual(expectUser);
        done();
      },
      (err) => {}
    );
  });
  it("should signup", (done: DoneFn) => {
    const signupValues = {
      name: "mi",
      email: "mi@mi.com",
      password: "123",
    };
    httpClientSpy.post.and.returnValue(of(expectUser));
    userService.signIn(signupValues).subscribe(
      (res) => {
        expect(res).toEqual(expectUser);
        done();
      },
      (err) => {}
    );
  });
});
