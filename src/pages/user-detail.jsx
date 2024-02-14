import React, { useEffect } from 'react'
import Layout from '../components/lay-out'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserStart, getUserSuccess } from '../slicers/user'
import UserService from '../services/user'
import ArticleCard from '../components/article-card'
import ArticleService from '../services/article'
import { getArticleError, getArticleSuccess, getArticlesStart } from '../slicers/articles'
import Loading from 'react-loading'
import '../components/style.css'


export default function UserDetail() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { articles, isLoading } = useSelector(state => state.article)


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
        const getUser = async () => {
            dispatch(getUserStart())
            try {
                const response = await UserService.getUser()
                dispatch(getUserSuccess(response.user))
            } catch (error) {
                console.error(error)
            }
        }
        getUser()
        getArticles()
    }, [])

    const sectionStyle = {width: '100%', display: 'flex', flexWrap: 'wrap'}
    const cardStyle = { width: '30%', margin: '10px' }


    return user && (
        <Layout>
            <div className="user-profile-section">
                <div className="user-profilee-card">
                    <div className="user-profilee-card-image-section">
                        <div className="user-profilee-card-image"></div>
                    </div>
                    <div className="profile-card-body" style={{ flexDirection: 'column', display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{user.username}</h2>
                            <Link to='/profile/edit'>
                                <button>Edit profile</button>
                            </Link>
                        </div>
                        <p>{user.bio}</p>
                    </div>
                </div>
                {isLoading && <Loading />}
                <div className='articles-cards-section' style={sectionStyle}>
                    {articles.map(item => {
                        if (item.author.username === user.username) {
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