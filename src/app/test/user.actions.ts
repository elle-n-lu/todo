import { createAction, props } from '@ngrx/store';

export const USER_SIGNIN =createAction('signIn', props<{payload:any}>())
export const USER_LOGOUT =createAction('logOut')
