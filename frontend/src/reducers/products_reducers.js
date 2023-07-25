import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from '../actions';


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

}

export default products_reducer;