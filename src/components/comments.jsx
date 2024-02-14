import React from 'react'
import './style.css'
import { AiFillDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Ccomments(props) {
  const { user, loggedIn } = useSelector(state => state.auth)

  const { body, id, author, deleteComment, slug } = props

  return (
    <div className='article-show-message'>
      <div className="article-card-image">
        <div className="article-card-images-image"></div>
      </div>
      <div className="article-card-body-section">
        <Link to={`/${loggedIn && user.username === author.username ? 'profile' : author.username}`}>
          <div className="article-comment-username" style={{ color: 'white' }}>{author.username}</div>
        </Link>
        <div className="article-comment-body">
          <span>{body}</span>
          <label>
            <AiFillDelete
              size={18}
              style={{ marginRight: '10px', cursor: 'pointer' }}
              onClick={() => deleteComment(slug, id)}
            />
          </label>
        </div>
      </div>
    </div>
  )
}