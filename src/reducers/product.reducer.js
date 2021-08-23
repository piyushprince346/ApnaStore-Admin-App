import { productConstants } from "../actions/constants";
const initialState = {
    loading: false,
    products: [],
    error: null,
    message: ''
}
const productReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
}

export default productReducer;