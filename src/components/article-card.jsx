import React, { useEffect, useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ArticleService from '../services/article'
import ArticleCommment from './article-card-comments'


export default function ArticleCard(props) {
    const { slug, title, favoritesCount, favorited, author, updatedAt, getArticles } = props
    const { loggedIn, user } = useSelector(state => state.auth)
    const [minTitle, setMinTitle] = useState(title.slice(0, 10) + ' ...')
    const [less, setLess] = useState(false)
    const [likeCount, setLikeCount] = useState(favoritesCount)
    const [favoritedStatus, setFavoritedStatus] = useState(favorited)

    const settMinTitle = () => {
        setLess(true)
        setMinTitle(title)
    }

    const settLess = () => {
        setLess(false)
        setMinTitle(title.slice(0, 10) + ' ...')
    }

    const deleteArticle = async slug => {
        try {
            await ArticleService.deleteArticle(slug)
            getArticles()
        } catch (error) {
            console.error(error)
        }
    }

    const likeArticle = async () => {
        try {
            await ArticleService.likeArticle(slug)
            setFavoritedStatus(true)
            setLikeCount(+likeCount + 1)
        } catch (error) {
            console.error(error)
        }
    }

    const unlikeArticle = async () => {
        try {
            await ArticleService.unlikeArticle(slug)
            setFavoritedStatus(false)
            setLikeCount(+likeCount - 1)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="card-head">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfQN2NU7sEhJuc4en01d7R-MCRbn4zfp0UAua32ts&s" alt="" />
            </div>
            <div className="card-body">
                <div className="icons-section">
                    <div className='like-section'>
                        {favoritedStatus ?
                            <AiFillLike className='like-button' onClick={unlikeArticle} /> :
                            <AiOutlineLike className='like-button' onClick={likeArticle} />
                        }
                        <h2>{likeCount}</h2>
                    </div>
                    <div className='like-section'>
                        <ArticleCommment {...props} />
                    </div>
                </div>
                <div className="card-body-username-description">
                    <Link to={`/${loggedIn && user.username === author.username ? 'profile' : author.username}`}>
                        <h2>{author.username}</h2>
                    </Link>
                    <p onClick={() => settMinTitle()}>
                        {minTitle}
                    </p><span
                        className={`less ${less ? 'show' : ''}`}
                        onClick={settLess}
                    >less</span>
                </div>
                <div className="article-create">
                    {moment(updatedAt).format('MMMM Do YYYY')}
                </div>
                <Link to={`/article/${slug}`}>
                    <button className='article-view'>View more</button>
                </Link>
                {loggedIn && author.username === user.username && (
                    <div className='edit-delete-section'>
                        <Link to={`/edit/${slug}`}>
                            Edit
                        </Link>
                        <button onClick={() => deleteArticle(slug)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}
