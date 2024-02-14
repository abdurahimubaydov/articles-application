import React, { useEffect, useState } from 'react'
import './style.css'
import Layout from '../components/lay-out'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postArticleStart } from '../slicers/articles'
import ArticleService from '../services/article'

export default function EditArticle() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const {slug} = useParams()
    const {isLoading} = useSelector(state => state.article)
    const article = {title, description, body}
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getArticle = async () => {
            try {
                const res = await ArticleService.getArticleDetail(slug) 
                setTitle(res.article.title)
                setDescription(res.article.description)
                setBody(res.article.body)
            } catch (error) {
                console.error(error)
            }
        }
        getArticle()
    }, slug)

    const submitArticle = async e => {
        e.preventDefault()  
        dispatch(postArticleStart())
        try {
            const response = await ArticleService.putArticle(slug, article)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className='create-article'>
                <h1>Edit article</h1>
                <form className='form' onSubmit={e => submitArticle(e)}>
                    <input
                        type="text"
                        placeholder='title...'
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea
                        placeholder='description...'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                    <textarea
                        placeholder='bio...'
                        onChange={e => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                    <button disabled={isLoading}>
                        {isLoading ? 'loading...' : 'edit'}
                    </button>
                </form>
            </div>
    </Layout>
  )
}