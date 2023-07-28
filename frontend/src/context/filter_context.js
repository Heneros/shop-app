
import React, { useEffect, useContext, useReducer, createContext } from 'react'
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";
import reducer from '../reducers/filter_reducers';
import { useProductsContext } from './products_context';


const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    }
}

const FilterContext = createContext();





export const FilterProvider = ({ children }) => {
    const { products } = useProductsContext()
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products })
    }, [products])

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS })
        dispatch({ type: SORT_PRODUCTS })
    }, [state.sort, state.filters])

    const updateSort = (e) => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SORT, payload: value })
    }
    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'category') {
            value = e.target.textContent;
        }
        if (name === 'price') {
            value = Number(value);
        }
        if (name === 'shipping') {
            value = e.target.checked;
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }
    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateSort,
                updateFilters,
                clearFilters
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () =>{
    return useContext(FilterContext)
}