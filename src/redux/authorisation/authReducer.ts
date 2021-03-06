import {ThunkDispatch} from "redux-thunk";
import {authorisationAPI} from "../../api/user-api";
import {I_loginInfo} from "../../../../Core/users-types";
import {stopSubmit} from "redux-form";

const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'users/LOGOUT_SUCCESS';


interface I_UserInfo {
    userId?: null | string,
    userName: null | string,
}

interface I_UserState extends I_UserInfo {
    isAuth: boolean,
}

const initialState: I_UserState = {
    isAuth: false,
    userId: null,
    userName: null,
};

type usersReducerActions = I_authorisationSuccess | I_logOutSuccess

interface I_authorisationSuccess {
    type: typeof LOGIN_SUCCESS,
    status: boolean,
    userInfo: I_UserInfo
}

interface I_logOutSuccess {
    type: typeof LOGOUT_SUCCESS,
}

const authorisationReducer = (state: I_UserState = initialState, action: usersReducerActions) => {
    switch (action.type) {
        //setting fetching status
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: action.status,
                userName: action.userInfo.userName ? action.userInfo.userName : null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
            };
        default:
            return state;
    }
};

export const _authorisationSuccess = (status: boolean, userInfo: I_UserInfo): I_authorisationSuccess => {
    return {
        type: LOGIN_SUCCESS, status, userInfo
    }
};
export const _logOutSuccess = (): I_logOutSuccess => {
    return {
        type: LOGOUT_SUCCESS
    }
};

export const logOut = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    await authorisationAPI.logOut();
    dispatch(_logOutSuccess());
};
export const logIn = (data: I_loginInfo) => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    try {
        let res = await authorisationAPI.logIn(data);
        dispatch(_authorisationSuccess(true, res.userInfo ? res.userInfo : 'name do not exist'));
    } catch (e) {
        let message = e.message.length > 0 ? e.message : "some error";
        dispatch(stopSubmit('logIn', {_error: message}))
    }
};

export default authorisationReducer;