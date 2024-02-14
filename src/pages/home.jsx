import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/lay-out'
import { getItem } from '../helpers'
import { useNavigate } from 'react-router-dom'
import { getArticleError, getArticleSuccess, getArticlesStart } from '../slicers/articles'
import ArticleService from '../services/article'
import Loading from 'react-loading'
import ArticleCard from '../components/article-card'
import './response.css'


export const Home = () => {
  const dispatch = useDispatch()
  const token = getItem('token')
  const navigate = useNavigate()
  const { articles, isLoading } = useSelector(state => state.article)

  useEffect(() => {
    if (!token) navigate('/login')
  }, token)

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

  const props = { getArticles }

  return (
    <Layout>
      <div className='articles-section'>
      {isLoading && <Loading />}
      <div className='articles-cards-section' >
        {articles && articles.map(item => (
          <div className='article-card' key={item.id}> 
            <ArticleCard {...item} {...props} />
          </div>
        ))}
      </div>
    </div>
    </Layout>
  )
}

