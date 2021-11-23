import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchProduct =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/photos');

    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
 
   };
