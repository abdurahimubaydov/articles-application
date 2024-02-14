import React, { useState } from 'react'
import Menu from './menu'
import { Link } from 'react-router-dom'
import './response.css'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

export default function Layout({ children }) {
  const [state, setState] = useState(true)
  const classs = state ? 'active' : ''

  return (
    <div className='home-section'>
      <div className={`icons-bars ${classs}`}>
        <div className="close-setClose">
          <AiOutlineClose size={30} color='white' onClick={() => setState(false)} />
        </div>
        <Link to={'/'}>
          <h1 onClick={() => setState(false)}>
            Articles
          </h1>
        </Link>
        <Menu setState={setState} />
      </div>
      <div
        className="content-section"
        style={{
          overflow: 'scroll'
        }}
      >
        <FaBars
          size={30}
          color='white'
          className='display-noone'
          style={{ margin: '15px' }}
          onClick={() => setState(true)}
        />
        {children}
      </div>
    </div>
  )
}