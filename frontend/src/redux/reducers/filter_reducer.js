import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        all_products: [],
        filtered_products: [],
        filters: {
            text: '',
            category: 'all',
            company: 'all',
            color: 'all',
            price: Infinity,
            shipping: false,
        },
    },
    reducers: {
        LOAD_PRODUCTS(state, action) {
            state.all_products = action.payload.products
            state.filtered_products = state.all_products
        },
        SET_GRIDVIEW(state) {
            state.grid_view = true
        },
        SET_LISTVIEW(state) {
            state.grid_view = false
        },
        UPDATE_SORT(state, action) {
            state.sort = action.payload.products
        },
        SORT_PRODUCTS(state) {
            const { sort, filtered_products } = state
            let tempProducts = []
            if (sort === 'price-lowest') {
                tempProducts = filtered_products.sort((a, b) => a.price - b.price)
            }
            if (sort === 'price-highest') {
                tempProducts = filtered_products.sort((a, b) => b.price - a.price)
            }
            if (sort === 'name-a') {
                tempProducts = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (sort === 'name-z') {
                tempProducts = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
            }

            state.filtered_products = tempProducts
        },
        UPDATE_FILTERS(state, action) {
            const { name, value } = action.payload.products
            state.filters[name] = value
        },
        FILTER_PRODUCTS(state) {
            const { all_products } = state
            const { text, category, company, color, price, shipping } = state.filters
            let tempProducts = [...all_products]
            if (text) {
                tempProducts = tempProducts.filter((product) =>
                    product.name.toLowerCase().startsWith(text)
                )
            }
            if (category !== 'all') {
                tempProducts = tempProducts.filter((product) => product.category === category)
            }
            if (company !== 'all') {
                tempProducts = tempProducts.filter((product) => product.company === company)
            }
            if (color !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.colors.find((c) => c === color)
                })
            }
            // filter by price
            tempProducts = tempProducts.filter((product) => product.price <= price)
            // filter by shipping
            if (shipping) {
                tempProducts = tempProducts.filter((product) => product.shipping === true)
            }
            state.filtered_products = tempProducts
        },
        CLEAR_FILTERS(state) {
            state.filters = {
                text: '',
                company: 'all',
                category: 'all',
                color: 'all',
                price: state.filters.max_price,
                shipping: false,
            }
        },
    },
})

export default filterSlice