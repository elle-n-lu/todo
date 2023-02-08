import {
  ComponentFixture, TestBed
} from "@angular/core/testing";
import { of } from "rxjs";
import { UserService } from "../test/user.service";

import { RecordsComponent } from "./records.component";
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
      declarations: [RecordsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
  });

  it("should get userlist", () => {
    userServiceSpy.getUserList.and.returnValue(of(userList));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  


});
