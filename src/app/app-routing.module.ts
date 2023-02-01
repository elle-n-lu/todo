import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  {path:'', component:TodoListComponent},
  {path:'signIn', component:SigninComponent},
  {path:'signUp', component:SignupComponent},
  {path:'users-history', component:TestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
