import React from 'react'
import { MdCreate } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { BiSave } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../helpers'
import { logOut } from '../slicers/auth'
import './style.css'
import './response.css'

export default function Menu({setState}) {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggOut = () => {
    removeItem('token')
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <div>
      <div className="menu-section">
        <div className='menu-section-start' >
          <Link 
            to={'/create-article'} 
            className="menu-card" 
            onClick={() => setState(false)}
          >
            <MdCreate className='menu-icon' /> <div >Create</div>
          </Link>
          <Link 
            to={'/saved'} 
            className="menu-card" 
            onClick={() => setState(false)}
          >
            <BiSave className='menu-icon' /> <div>Saved</div>
          </Link>
          <Link 
            to={`/profile`} 
            className="menu-card" 
            onClick={() => setState(false)}
          >
            <CgProfile className='menu-icon' /> <div>Profil</div>
          </Link>
        </div>
        <div className='menu-section-end'>
          <button className='log-out' onClick={loggOut}>log out</button>
        </div>
      </div>
    </div>
  )
}
