import { createReducer, on } from "@ngrx/store";
import { trans} from "./user.actions";


// const initialUser: any = localStorage.getItem('userinfo')
const initialState = {trans: false}
export const transReducer = createReducer(
  initialState,
  on(trans, (state)=>{return {...state,trans:true}}),
);

