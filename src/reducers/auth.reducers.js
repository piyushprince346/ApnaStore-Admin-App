import { authConstants } from "../actions/constants";

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

const signupState = {
    error: null,
    message: '',
    loading: false
}

const authReducers = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticate: true,
                authenticating: false,
                user: action.payload.user,
                token: action.payload.token
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.SIGNUP_REQUEST:
            state = {
                ...signupState,
                loading: true
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...signupState,
                loading: false,
                message: action.payload.message
            }
            break;
        case authConstants.SIGNUP_FAILURE:
            state = {
                ...signupState,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}

export default authReducers;