import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featuredProducts: [],
    productsLoading: false,
    productsError: false,
    singleProduct: null,
    singleProductLoading: false,
    singleProductError: false,
  },
  reducers: {
    SIDEBAR_OPEN(state) {
      state.isSidebarOpen = true
    },
    SIDEBAR_CLOSE(state) {
      state.isSidebarOpen = false
    },
    GET_PRODUCTS_BEGIN(state) {
      state.productsLoading = true
    },
    GET_PRODUCTS_SUCCESS(state, action) {
      const featuredProducts = action.payload.filter((product) => product.featured === true)
      state.products = action.payload
      state.featuredProducts = featuredProducts
      state.productsLoading = false
    },
    GET_PRODUCTS_ERROR(state) {
      state.productsLoading = false
      state.productsError = true
    },
    GET_SINGLE_PRODUCT_BEGIN(state) {
      state.singleProductLoading = true
      state.singleProductError = false
    },
    GET_SINGLE_PRODUCT_SUCCESS(state, action) {
      state.singleProduct = action.payload
      state.singleProductLoading = false
    },
    GET_SINGLE_PRODUCT_ERROR(state) {
      state.singleProductLoading = false
      state.singleProductError = true
    },
  },
})

export default productsSlice