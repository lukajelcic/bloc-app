import { LOADING_DATA, SET_POSTS, SET_POST, LIKE_POST, UNLIKE_POST, DELETE_POST } from '../types';

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


//Delete Post
export const deletePost = (blogId) => (dispatch) => {
    axios.delete(`/blogs/${blogId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: blogId })
        })
        .catch(err => {
            console.log(err)
        })
}