import axios from '../helpers/axios';
import { categoryConstants } from './constants';

const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
        })
        const res = await axios.get('/category/getCategories');
        console.log(res);
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        }
        else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
};

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        });
        try {
            const res = await axios.post('category/create', form);
            if (res.status === 201) {
                // successfully created new category
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.category
                    }
                })
            }
            else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        } catch (error) {
            alert(error.response.data.message);
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            })
        }
    }
};

export const updateCategories = (form) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_REQUEST
        })
        const res = await axios.post('category/update', form);
        if (res.status === 201) {
            // successfully created new category  
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
                payload: {
                    updatedCategories: res.data.updatedCategories
                }
            })
            dispatch(getAllCategory());
        }
        else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}

export const deleteCategoriesAction = (ids) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.DELETE_CATEGORIES_REQUEST
        })
        const res = await axios.post('category/delete', {
            payload: {
                ids
            }
        });
        if (res.status === 201) {
            // successfully deleted categories
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
            dispatch(getAllCategory());
        }
        else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
};

export {
    getAllCategory
}