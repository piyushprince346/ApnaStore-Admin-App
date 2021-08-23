import axios from "../helpers/axios";
import { authConstants, categoryConstants, pageConstants } from "./constants";
export const login = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post('/admin/signin', user);
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
        }
        else {
            // login failure
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }

    }
};

export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: authConstants.SIGNUP_REQUEST });
        const res = await axios.post('/admin/signup', user);
        if (res.status === 201) {
            const { message } = res.data;
            // alert(message);
            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: {
                    message
                }
            })
        }
        else {
            // signup failure
            if (res.status === 400) {
                // alert(res.data.errors);
                // console.log(res.data.errors);
                dispatch({
                    type: authConstants.SIGNUP_FAILURE,
                    payload: {
                        error: res.data.errors
                    }
                })
            }
        }

    }
};

export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            })
        }
    }
};

export const signout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        });
        const res = await axios.post('/admin/signout');
        if (res.status === 200) {
            localStorage.clear();
            console.log('Good');
            dispatch({
                type: categoryConstants.REMOVE_CATEGORY_DATA
            })
            dispatch({
                type: pageConstants.REMOVE_PAGE_DATA
            })
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        }
        else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
};