import React, { useEffect, useState } from 'react'
import './style.css'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthError from '../components/auth-error'
import { authStart, authSuccess, authError } from '../slicers/auth'
import AuthService from '../services/auth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const {isLoading, user, loggedIn} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const userCard = {email, password}


    const setIconView = () => {
        if (show === false) setShow(true)
        else setShow(false)
    }

    const authHandler = async (e) => {
        e.preventDefault()
        dispatch(authStart())
        try {
            const response = await AuthService.userLogin(userCard)
            dispatch(authSuccess(response.user))
            navigate('/')
        } catch (error) {
            dispatch(authError(error.response.data.errors))
        }
        setEmail('')
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
                <h2>Login</h2>
                <label>
                    <input
                        type="email"
                        placeholder='email...'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </label>
                <label>
                    <input
                        type={!show ? 'password' : 'text'}
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    {!show ? <BiHide className='show-icon' onClick={setIconView}size={20}/> :
                     <BiShow className='show-icon' onClick={setIconView}size={20}/>}
                </label>
                <button>login</button>
                <Link to={'/register'}>If you haven't an account</Link>
            </form>
        </div>
    )
}