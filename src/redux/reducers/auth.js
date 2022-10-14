import { SIGNUP_SUCCESS,
    SIGNUP_FAIL, ACTIVATION_SUCCESS, ACTIVATION_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING, LOGIN_SUCCES, LOGIN_FAIL,
    USER_LOADER_SUCCES, USER_LOADER_FAIL, AUTHENTICATED_SUCCES, AUTHENTICATED_FAIL, REFRESH_SUCCES, REFRESH_FAIL, LOGOUT,
     RESET_PASSWORD_SUCCES, RESET_PASSWORD_FAIL, RESET_PASSWORD_CONFIRM_SUCCES, RESET_PASSWORD_CONFIRM_FAIL } from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    loading: false,
}

export default function Auth(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SET_AUTH_LOADING:
            return{
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
                return{
                    ...state,
                    loading: false
            }
        case USER_LOADER_SUCCES:
            return{
                ...state,
                user: payload
            }
        case USER_LOADER_FAIL:
            return {
                ...state,
                user: false
            }
        case AUTHENTICATED_SUCCES:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return { 
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }
        case LOGIN_SUCCES:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);

            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'), 
                refresh: localStorage.getItem('refresh'),
            }

        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case RESET_PASSWORD_SUCCES:
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_SUCCES:
        case RESET_PASSWORD_CONFIRM_FAIL:

            return{
                ...state
            }
        case REFRESH_SUCCES:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: localStorage.getItem('access')
            }
        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                return {
                    ...state,
                    access: null,
                    refresh: null,
                    isAuthenticated: false,
                    user: null,
                }
        case LOGIN_FAIL:
        case REFRESH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }



        default: return state
    }

}