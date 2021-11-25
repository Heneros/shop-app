import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchProducts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/photos');

    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
 
   };
export const fetchUser = (id) => async dispatch =>{
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({type: 'FETCH_USER', payload: response.data});
};