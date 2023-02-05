import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard';
import { RecordsComponent } from './records/records.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  {path:'', component:TodoListComponent},
  {path:'signIn', component:SigninComponent},
  {path:'signUp', component:SignupComponent},
  {path:'users-history', component:RecordsComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
