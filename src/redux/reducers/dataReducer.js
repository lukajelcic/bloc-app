import {
    SET_POSTS,
    SET_POST,
    POST_BLOG,
    LOADING_DATA,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST
} from '../types';

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
            };
        case SET_POSTS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            };
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.blogs.findIndex((blog) => blog.blogId === action.payload.blogId);
            state.blogs[index] = action.payload
            return { ...state };
        case DELETE_POST:
            index = state.blogs.findIndex(blog => blog.blogId === action.payload.blogId);
            state.blogs.splice(index, 1);
            return { ...state };
        case POST_BLOG:
            return {
                ...state,
                blogs: [
                    action.payload,
                    ...state.blogs
                ]
            };
        default: return state;
    }
}