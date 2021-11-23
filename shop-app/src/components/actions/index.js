import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/photos');

    dispatch({ type: 'FETCH_PHOTOS', payload: response});
 
   };
