import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard';
import { RecordsComponent } from './records/records.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserGuard } from './userguard';


const routes: Routes = [
  {path:'', component:TodoListComponent},
  {path:'signIn', component:SigninComponent, canActivate:[UserGuard]},
  {path:'signUp', component:SignupComponent, canActivate:[UserGuard]},
  {path:'users-history', component:RecordsComponent,canActivate:[AuthGuard],children:[
    {path:'',component:RecordsComponent},
    {path:'/id',component:SigninComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
