import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_SINGLE_PRODUCT_BEGIN } from '../actions';


const products_reducer = (state, action) => {
    if (action.type === GET_PRODUCTS_BEGIN) {
        return { ...state, products_loading: true }
    }
    if (action.type === GET_PRODUCTS_SUCCESS) {
        const featured_products = action.payload.filter(
            (product) => product.featured === true
        )
        return {
            ...state,
            products_loading: false,
            products: action.payload,
            featured_products,
        }
    }
    if (action.type === GET_PRODUCTS_ERROR) {
        return { ...state, products_loading: false, products_error: true }
    }
    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
        return {
            ...state,
            single_product_loading: true,
            single_product_error: false
        }
    }

}

export default products_reducer;