import React, { useEffect, useState } from 'react'
import Layout from '../components/lay-out'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import UserService from '../services/user'
import { editUserStart, editUserSuccess } from '../slicers/user'
import { useNavigate } from 'react-router-dom'

export default function EditProfile() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {user} = await UserService.getUser()
        setUsername(user.username)
        setEmail(user.email)
        setBio(user.bio)
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [user])


  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(editUserStart())
    const userrr = {username, email, bio}
    try {
      const {user} = await UserService.editUser(userrr)
      dispatch(editUserSuccess(user))
      setUsername(user.username)
      setEmail(user.email)
      setBio(user.bio)
      navigate('/profile')
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Layout>
      <div className='create-article'>
        <h1>Edit User</h1>
        <form className='form' onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder='username'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <textarea
            placeholder='bio...'
            onChange={e => setBio(e.target.value)}
            value={bio}
          ></textarea>
          <button disabled={isLoading}>
            {isLoading ? 'loading' : 'Edit'}
          </button>
        </form>
      </div>
    </Layout>
  )
}