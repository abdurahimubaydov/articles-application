import React, { useEffect, useState } from 'react'
import Layout from '../components/lay-out'
import { Link, useParams } from 'react-router-dom'
import { getArticleError, getArticleSuccess, getArticlesStart } from '../slicers/articles'
import Loading from 'react-loading'
import '../components/style.css'
import { useDispatch, useSelector } from 'react-redux'
import ArticleService from '../services/article'
import ArticleCard from '../components/article-card'
import { getProfileError, getProfileStart, getProfileSuccess } from '../slicers/profile'
import ProfileSerice from '../services/profile'


export default function UserInfo() {
    const {isLoading, articles} = useSelector(state => state.article) 
    const {user} = useSelector(state => state.auth)
    const {profile, } = useSelector(state => state.profile)
    const {username} = useParams()
    const dispatch = useDispatch()
    const sectionStyle = {width: '100%', display: 'flex', flexWrap: 'wrap'}
    const cardStyle = { width: '30%', margin: '10px' }
    const followUser = { following: true }
    const unfollowUser = { following: false }

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
        const getProfile = async () => {
            dispatch(getProfileStart())
            try {
                const response = await ProfileSerice.getProfile(username)
                dispatch(getProfileSuccess(response.profile))
            } catch (error) {
                dispatch(getProfileError())
            }
        }
        getProfile()
        getArticles()
    }, [])

    const followToProfile = async () => {
        try {
            const res = await ProfileSerice.followProfile(username, followUser)
            dispatch(getProfileSuccess(res.profile))
        } catch (error) {
            console.error(error)
        }
    }

    const unfollowToProfile = async () => {
        try {
            const res = await ProfileSerice.unfollowProfile(username, unfollowUser)
            dispatch(getProfileSuccess(res.profile))
        } catch (error) {
            console.error(error)
        }
    }


    return profile && (
        <Layout>
            <div className="user-profile-section">
                <div className="user-profilee-card">
                    <div className="user-profilee-card-image-section">
                        <div className="user-profilee-card-image"></div>
                    </div>
                    <div className="profile-card-body" style={{ flexDirection: 'column', display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{profile.username}</h2>
                            {profile.following === true ? 
                                <button onClick={unfollowToProfile}>following</button>: 
                                <button onClick={followToProfile}>follow</button>
                            }
                        </div>
                        <p>{profile.bio}</p>
                    </div>
                </div>
                {isLoading && <Loading />}
                <div className='articles-cards-section' style={sectionStyle}>
                    {articles && articles.map(item => {
                        if (item.author.username === profile.username) {
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