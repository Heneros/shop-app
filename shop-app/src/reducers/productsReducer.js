import _ from 'lodash';


import { 
  ADD_PRODUCT,
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT

 } from '../actions/types'


export default (state = {}, action) =>{
  switch(action.type){
      case FETCH_PRODUCTS:
        return {...state, ..._.mapKeys(action.payload, 'id')};
      case FETCH_PRODUCT:
          return { ...state, [action.payload.id]: action.payload };
      case CREATE_PRODUCT:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_PRODUCT:
          return { ...state, [action.payload.id]: action.payload };
      case DELETE_PRODUCT:
            return _.omit(state, action.payload);
      default:
          return state;    
  }
};