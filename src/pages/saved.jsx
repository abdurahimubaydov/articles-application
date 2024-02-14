import React, { useEffect } from 'react'
import './style.css'
import Layout from '../components/lay-out'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '../components/article-card'
import { getArticleError, getArticleSuccess, getArticlesStart } from '../slicers/articles'
import ArticleService from '../services/article'

export default function Saved() {
    const { articles } = useSelector(state => state.article)
    const dispatch = useDispatch()

    const getArticles = async () => {
        dispatch(getArticlesStart())
        try {
            const response = await ArticleService.getArticles()
            dispatch(getArticleSuccess(response.articles))
        } catch (error) {
            dispatch(getArticleError())
        }
    }

    useEffect(() => {
        getArticles()
    }, [])

    const sectionStyle = { width: '100%', display: 'flex', flexWrap: 'wrap' }
    const cardStyle = { width: '30%', margin: '10px' }
    return (
        <Layout>
            <div className='saved-section'>
                <h1>Saved articles</h1>
                <div className='articles-cards-section' style={sectionStyle}>
                    {articles && articles.map(item => {
                        if (item.favorited === true) {
                            return (
                                <div className='article-card' key={item.id} style={cardStyle}>
                                    <ArticleCard {...item} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </Layout>
    )
}