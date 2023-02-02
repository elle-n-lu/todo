import { createReducer, on } from "@ngrx/store";
import { UserParams } from "./user-params";
import {  USER_LOGOUT, USER_SIGNIN } from "./user.actions";


const initialUser: any = localStorage.getItem('userinfo')

const _userReducer = createReducer(
  initialUser,
  on(USER_SIGNIN, (state,action)=>{return {...state,...action.payload}}),
  on(USER_LOGOUT, () => {return initialUser}),
);

export function counterReducer(state, action) {
    return _userReducer(state, action);
  }
