import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    isLoading: false,
    error: null,
    articleDetail: null,
    articleDetailComment: []
}

const ArticlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        getArticlesStart: state => {
            state.isLoading = true
        },
        getArticleSuccess: (state, action) => {
            state.isLoading = false
            state.articles = action.payload
        },
        getArticleError: state => {
            state.isLoading = false
            state.error = 'Error'
        },
        getArticleDetailStart: state => {
            state.isLoading = true
        },
        getArticleDetailSuccess: (state, action) => {
            state.isLoading = false
            state.articleDetail = action.payload
        },
        getArticleDetailError: state => {
            state.isLoading = false
        },
        postArticleStart: state => {
            state.isLoading = true
        },
        postArticleSuccess: state => {
            state.isLoading = false
        },
        postArticleError: state => {
            state.isLoading = false
            state.error = 'Error'
        },
        getArticleCommentsStart: state => {
            state.isLoading = true
        },
        getArticleCommentsSuccess: (state, action) => {
            state.isLoading = false
            state.articleDetailComment = action.payload
        },
        getArticleCommentsError: state => {
            state.error = 'Error'
        }
    }
})

export const { 
    getArticlesStart, 
    getArticleSuccess, 
    getArticleError, 
    getArticleDetailStart, 
    getArticleDetailSuccess, 
    getArticleDetailError,
    postArticleStart,
    postArticleSuccess,
    postArticleError,
    getArticleCommentsStart,
    getArticleCommentsSuccess, 
    getArticleCommentsError
}  = ArticlesSlice.actions
export default ArticlesSlice.reducer