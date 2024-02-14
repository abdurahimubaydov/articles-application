import React, { useEffect, useState } from 'react'
import './style.css'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Auth, { authError, authStart, authSuccess } from '../slicers/auth'
import AuthService from '../services/auth'
import AuthError from '../components/auth-error'

export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const { isLoading, loggedIn } = useSelector(state => state.auth)
    const userCard = {email, username, password}
    const navigate = useNavigate()

    const setIconView = () => {
        if (show === false) setShow(true)
        else setShow(false)
    }

    const authHandler = async (e) => {
        e.preventDefault()
        dispatch(authStart())
        try {
            const response = await AuthService.userRegister(userCard)
            dispatch(authSuccess(response.user))
            navigate('/')
        } catch (error) {
            dispatch(authError(error.response.data.errors))
        }

        setEmail('')
        setUsername('')
        setPassword('')
    }   

    useEffect(() => {
        if (loggedIn) navigate('/')
    }, [loggedIn])


    return (
        <div className='login-section'>
            <AuthError/>
            <form 
                className="login-card" 
                onSubmit={e => authHandler(e)}
            >
                <h2>Register</h2>
                <label>
                    <input
                        type="email"
                        placeholder='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder='username'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </label>
                <label>
                    <input
                        type={!show ? 'password' : 'text'}
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    {!show ? <BiHide className='show-icon' onClick={setIconView}size={20}/> :
                     <BiShow className='show-icon' onClick={setIconView}size={20}/>}
                </label>
                <button disabled={isLoading}>
                    {isLoading ? 'loading...' : 'register'}
                </button>
                <Link to='/login' href="">If you have an account!</Link>
            </form>
        </div>
    )
}