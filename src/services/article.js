import axios from './api'

const ArticleService = {
    async getArticles() {
        const {data} = await axios.get('/articles')
        return data
    },
    async getArticleDetail(slug) {
        const {data} = await axios.get(`/articles/${slug}`)
        return data
    },
    async postArticle(article) {
        const {data} = await axios.post('/articles', {article})
        return data
    },
    async deleteArticle(slug) {
        const {data} = await axios.delete(`/articles/${slug}`)
        return data
    },
    async putArticle(slug, article) {
        const {data} = await axios.put(`/articles/${slug}`, {article})
        return data
    },
    async likeArticle(slug) {
        const {data} = await axios.post(`/articles/${slug}/favorite`)
        return data
    },
    async unlikeArticle(slug) {
        const {data} = await axios.delete(`/articles/${slug}/favorite`)
        return data
    },
    async postComment(slug, comment) {
        const {data} = await axios.post(`/articles/${slug}/comments`, {comment})
        return data
    },
    async deleteComment(slug, id) {
        const {data} = await axios.delete(`/articles/${slug}/comments/${id}`)
        return data
    }
}

export default ArticleService