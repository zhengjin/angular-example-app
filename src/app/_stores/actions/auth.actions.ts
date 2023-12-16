import {createAction, props} from "@ngrx/store";
import {Login, SignUp} from "../../_interfaces/auth.interface";

const TYPE = '[Auth]';

export const LoginAction = createAction(`${TYPE} Login`, props<{params: Login}>());
export const LogoutAction = createAction(`${TYPE} Logout`);
export const SignUpAction = createAction(`${TYPE} SignUp`, props<{params: SignUp}>());
