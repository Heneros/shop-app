import axios from "axios";
import { GET_SINGLE_PRODUCT_BEGIN, SIDEBAR_OPEN } from "../actions";
import { useReducer } from "react";

export const ProductsProvider = ({ children }) => {
//    const [state, dispatch] = useReducer(reducer,  )
   
    const fetchSingleProduct = async (url) => {
        dispatchEvent({ type: GET_SINGLE_PRODUCT_BEGIN })
        try {
            const response = await axios.get(url);
            const singleProduct = response.data;
            // dispatch
        } catch (error) {

        }

    }
}
