const { createContext } = require("react")


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
        price: 0
    }
}

const FilterContext = createContext();





export const FilterProvider = ({ children }) => {
    // const { products };
}