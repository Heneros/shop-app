export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_COMMENT':
            return [...state, action.payload];
        default:
            return state;    
    }

}