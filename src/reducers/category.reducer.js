import { categoryConstants } from "../actions/constants";

const initialState = {
    loading: false,
    categories: [],
    error: null,
    message: ''
}

const buildNewCategories = (categories, category) => {
    let newCategories = [];
    if (category.parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                parentId: category.parentId,
                name: category.name,
                slug: category.slug,
                children: [],
                categoryImage: category.categoryImage
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id === category.parentId) {
            // new category is children of cat
            newCategories.push({
                ...cat,
                children: (cat.children) ? buildNewCategories([...cat.children, {
                    _id: category._id,
                    parentId: category.parentId,
                    name: category.name,
                    slug: category.slug,
                    children: [],
                    categoryImage: category.categoryImage
                }], category) : []
            })
        }
        else {
            newCategories.push({
                ...cat,
                children: (cat.children) ? buildNewCategories(cat.children, category) : []
            })
        }

    }
    return newCategories;
}

const categoryReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            let category = action.payload.category;
            const updatedCategories = buildNewCategories(state.categories, category);
            //console.log(updatedCategories);
            state = {
                ...state,
                loading: false,
                error: null,
                message: 'New Category Created Successfully with name: ' + category.name,
                categories: updatedCategories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstants.REMOVE_CATEGORY_DATA:
            state = {
                ...state,
                loading: false,
                error: null,
                message: ''
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: 'Categories updated successfully...!'
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}

export default categoryReducer;