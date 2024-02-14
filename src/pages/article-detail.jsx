import React, { useEffect } from 'react'
import Layout from '../components/lay-out'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleDetailError, getArticleDetailStart, getArticleDetailSuccess } from '../slicers/articles'
import ArticleService from '../services/article'
import Loading from 'react-loading'

export default function ArticleDetail() {
  const {slug} = useParams()
  const { articleDetail, isLoading } = useSelector(state => state.article)
  const dispatch = useDispatch()

  useEffect(() => {
    const getArticle = async () => {
      dispatch(getArticleDetailStart())
      try {
        const response = await ArticleService.getArticleDetail(slug)
        dispatch(getArticleDetailSuccess(response.article))
      } catch (error) {
        dispatch(getArticleDetailError())
      }
    }
    getArticle()
  }, slug)



  return articleDetail && (
    <Layout>
      <div className='article-detail-section'>
        {isLoading && <Loading/>}
        <h1> {articleDetail.title} </h1>
        <p>{articleDetail.description}</p>
        <span>{articleDetail.body}</span>
        <div className="user-card">
          <div className="user-card-left">
            <h3>{articleDetail.author.username}</h3>
            <span>{articleDetail.author.bio}</span>
          </div>
          <div className="user-card-right">
            <b style={{fontSize: '20px'}}>{articleDetail.author.username.slice(0,1)}</b>
          </div>
        </div>
      </div>
    </Layout>
  )
}