import axios from "axios";
import { GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, SIDEBAR_OPEN } from "../actions";
import { useReducer } from "react";

const initialState = {
    products: [],
    single_product: {}
}

export const ProductsProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);

    const fetchSingleProduct = async (url) => {
        dispatchEvent({ type: GET_SINGLE_PRODUCT_BEGIN })
        try {
            const response = await axios.get(url);
            const singleProduct = response.data;
         //   dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
        } catch (error) {

        }

    }
}
