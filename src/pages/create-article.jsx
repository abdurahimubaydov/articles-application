import React, { useState } from 'react'
import Layout from '../components/lay-out'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { postArticleError, postArticleStart, postArticleSuccess } from '../slicers/articles'
import ArticleService from '../services/article'
import { useNavigate } from 'react-router-dom'

export default function CreateArticle() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const { isLoading } = useSelector(state => state.article)
    const dispatch = useDispatch()
    const card = { title, description, body }
    const navigate = useNavigate()

    const submitArticle = async e => {
        e.preventDefault()
        dispatch(postArticleStart())
        try {
            const response = await ArticleService.postArticle(card)
            dispatch(postArticleSuccess())
            navigate('/')
        } catch (error) {
            dispatch(postArticleError())
        }
    }

    return (
        <Layout>
            <div className='create-article'>
                <h1>Create article</h1>
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
                        {isLoading ? 'loading...' : 'create'}
                    </button>
                </form>
            </div>
        </Layout>
    )
}