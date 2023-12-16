import {User} from "../../_interfaces/user.interface";
import {Statuses} from "../../app.constants";
import {Action, createReducer, on} from "@ngrx/store";
import * as userActions from "../actions/user.actions";


export interface UserState {
  data: User;
  status: Statuses
}

export const initialState: UserState = {
  data: {
    id: 0,
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: ''
  },
  status: Statuses.UNINITIALIZED
};

const user = createReducer(
  initialState,
  on(userActions.SetUser, (state, payload) => {
    return {
      ...state,
      data: payload.user,
      status: Statuses.LOADED
    };
  }),
  on(userActions.LoadingUser, (state) => {
    return {
      ...state,
      data: {
        id: 0,
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: ''
      },
      status: Statuses.LOADING
    }
  }),
  on(userActions.ResetUser, (state => ({...state, 
    data: {
      id: 0,
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: ''
  }, status: Statuses.UNINITIALIZED})))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return user(state, action);
}
