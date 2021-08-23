import { pageConstants } from "../actions/constants";

const initialState = {
    loading: false,
    error: null,
    message: '',
    page: {}
}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: 'Page created Successfully',
                page: action.payload.page
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: ''
            }
            break;
        case pageConstants.REMOVE_PAGE_DATA:
            state = {
                ...initialState
            }
            break;
    }
    return state;
}

export default pageReducer;