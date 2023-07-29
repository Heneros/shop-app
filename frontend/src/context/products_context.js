// import axios from "axios";
// import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_ERROR, GET_SINGLE_PRODUCT_SUCCESS, SIDEBAR_OPEN } from "../actions";
// import { createContext, useContext, useEffect, useReducer } from "react";
// import reducer from '../reducers/products_reducers';
// import { products_url as url } from '../utils/constants';

// const initialState = {
//     products_loading: false,
//     products_error: false,
//     products: [],
//     featured_products: [],
//     single_product_loading: false,
//     single_product_error: false,
//     single_product: {},
// }

// const ProductsContext = createContext();

// export const ProductsProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);



//     const fetchProducts = async (url) => {
//         dispatch({ type: GET_PRODUCTS_BEGIN })
//         try {
//             const response = await axios(url);
//             const products = response.data
//             dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
//         } catch (error) {
//             dispatch({ type: GET_PRODUCTS_ERROR })
//         }
//     }

//     const fetchSingleProduct = async (url) => {
//         dispatchEvent({ type: GET_SINGLE_PRODUCT_BEGIN })
//         try {
//             const response = await axios.get(url);
//             const products = response.data;
//             dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: products })
//         } catch (error) {
//             dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
//         }
//     }
//     useEffect(() => {
//         fetchProducts()
//     }, []);

//     return (
//         <ProductsContext
//             value={{
//                 ...state,
//                 fetchSingleProduct
//             }}
//         >
//             {children}
//         </ProductsContext>
//     )
// }

// export const useProductsContext = () => {
//     return useContext(ProductsContext)
// }
