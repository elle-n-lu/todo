import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TestComponent } from "./test/test.component";
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserStatusService } from "./signin/userStatus.service";
import { counterReducer } from "./test/user.reducers";
import { RecordsComponent } from './records/records.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TestComponent, SigninComponent, SignupComponent, RecordsComponent],
  imports: [
    StoreModule.forRoot({userstate:counterReducer}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [HttpClient, UserStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
