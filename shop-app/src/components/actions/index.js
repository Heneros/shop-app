import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts =  () => {
    const promise =  jsonPlaceholder.get('/photos');

    return {
        type: 'FETCH_POSTS',
        payload: promise
    };
};