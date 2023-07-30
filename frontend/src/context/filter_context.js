
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
// import filterReducer from '../redux/slices/filter';
import filterReducer, {
    loadProducts,
    updateSort,
    sortProducts,
    updateFilters,
    filterProducts,
    clearFilters,
} from '../redux/slices/filter';
// filterReducer
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
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(filterReducer, initialState);

    useEffect(() => {
        dispatch(loadProducts(products));
    }, [products]);

    useEffect(() => {
        dispatch(filterProducts());
        dispatch(sortProducts());
    }, [state.sort, state.filters]);

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    };

    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    };


    const updateSort = (e) => {
        const value = e.target.value;
        dispatch(updateSort(value));
    };

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
        dispatch(updateFilters({ name, value }));
    };

    const clearFilters = () => {
        dispatch(clearFilters());
    };


    return (
        <FilterContext.Provider
            value={{
                ...state,
                setGridView,
                setListView,
                updateSort,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};