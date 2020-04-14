import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';
import axios from 'axios';


//Get all data
export const getPost = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/blogs')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

//Like post 
export const likePost = (blogId) => dispatch => {
    axios.get(`/blog/${blogId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//Unike post 
export const unlikePost = (blogId) => dispatch => {
    axios.get(`/blog/${blogId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}