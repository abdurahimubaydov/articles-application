import * as React from 'react';
import Modal from '@mui/material/Modal';
import { BiComment } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import axios from '../services/api';
import Ccomments from './comments';
import ArticleService from '../services/article';
import { ImCancelCircle } from 'react-icons/im'

export default function ArticleCommment(props) {
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = React.useState([])
    const [body, setBody] = React.useState('')
    const [isLoading, setIsloading] = React.useState(false)
    const [added, setAdded] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen();
    const { slug } = props

    const getArticleComment = async e => {
        await axios
            .get(`articles/${slug}/comments`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        if (open === true) {
            getArticleComment()
        }
    }, [open])

    const submitHandler = async e => {
        e.preventDefault()
        setIsloading(true)
        const commentttt = { body }
        setAdded(true)
        try {
            const res = await ArticleService.postComment(slug, commentttt)
            setIsloading(false)
            setOpen(false)
        } catch (error) {
            console.error(error)
            setIsloading(false)
        }
        setBody('')
    }

    React.useEffect(() => {
        setTimeout(() => {
            setAdded(false)
        }, 3000)
    }, [added === true])


    const deleteComment = async (slug, id) => {
        try {
            const response = await ArticleService.deleteComment(slug, id)
            getArticleComment()
        } catch (error) {
            console.error(error)
        }
    }

    const prop = { deleteComment, slug }


    return (
        <div>
            <div className={` congrulate-array ${added ? 'active' : ''}`}>
                <span>comment added</span>
                <ImCancelCircle size={20} color='#184C78' onClick={() => setAdded(false)} />
            </div>
            <BiComment
                className='like-button'
                onClick={handleOpen}
                style={{ outline: 'none' }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='article-card-comment-section'
                style={{ outline: 'none' }}
            >
                <div className='article-comment-card'
                    style={{ outline: 'none' }}
                >
                    <h1>Comments</h1>
                    <div className="comments add-scroll">
                        {comments.length !== 0 ? comments.comments.map(item => (
                            <div key={item.id}>
                                <Ccomments {...item} {...prop} />
                            </div>
                        )) : (
                            <h1></h1>
                        )}
                    </div>
                    <form
                        className="comment-input-section"
                        onSubmit={e => submitHandler(e)}
                    >
                        <input
                            type="text"
                            placeholder='add a comment...'
                            onChange={e => setBody(e.target.value)}
                            value={body}
                        />
                        <button disabled={isLoading}>
                            {isLoading === true ? 'loading...' : 'post'}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}