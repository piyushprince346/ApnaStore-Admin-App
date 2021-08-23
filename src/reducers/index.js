import authReducers from './auth.reducers';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import categoryReducer from './category.reducer';
import pageReducer from './page.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducers,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer,
    page: pageReducer
});

export default rootReducer;