import _ from 'lodash';

import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchProducts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
};

export const fetchUser = id => async dispatch => _fetchUser(id, dispatch);

const  _fetchUser = _.memoize( async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
});


export const fetchComment = id => async dispatch =>{
  const response = await jsonPlaceholder.get(`/comments`);
  dispatch({ type: 'FETCH_COMMENT', payload: response.data});
};