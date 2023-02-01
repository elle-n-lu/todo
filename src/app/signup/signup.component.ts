import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserParams } from '../test/user-params';
import { UserService } from '../test/user.service';

export interface errors {
  field: string
  message: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup
  errors: errors = {field:'', message:'sadsadasd'}

  constructor(private userService: UserService) {}
  private _signUpDestroyed$: Subject<any> = new Subject();
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  ngOnDestroy(): void {
    this._signUpDestroyed$.complete();

  }
  
  signUp(user: UserParams): void {
    this.userService
      .signUp(user)
      .pipe(takeUntil(this._signUpDestroyed$))
      .subscribe((res) => {
        // this._userList.push(new UserParams( user.name, user.email, user.password, user.id))
        console.log('res signup',res)
        this.errors={field:'', message:''}
      }, (err)=>{
        console.log('err', err.error as string)
        if( (err.error as string).includes('unique_user')){
          this.errors={field:'name', message:'name already exist'}
        }
        if((err.error as string).includes('unique_email')){
          this.errors={field:'email', message:'email already exist'}
        }
      });
      
  }


}
