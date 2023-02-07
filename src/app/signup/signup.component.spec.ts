import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../test/user.service';

import { SignupComponent } from './signup.component';

const user = {name:'mi',email:'mi@mi.com',password:'123'}
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const userServiceSpy = jasmine.createSpyObj<UserService>(["signUp"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers:[{ provide: UserService, useValue: userServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });
  
  it('should sign up', () => {
    userServiceSpy.signUp.and.returnValue(of(user))
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
