import { SET_POSTS, SET_POST, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';

const initialState = {
    blogs: [],
    blog: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.blogs.findIndex((blog) => blog.blogId === action.payload.blogId);
            state.blogs[index] = action.payload
            return { ...state }
        default: return state
    }
}