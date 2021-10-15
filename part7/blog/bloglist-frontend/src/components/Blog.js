import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, blogUpdate } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, username }) => {

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 1,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButtonstyle = {
    backgroundColor: 'darkseagreen',
    border: 'none'
  }


  const addLikes = () => {
    const { user, ...restBlog } = blog
    dispatch(blogUpdate({ user: user.id, ...restBlog }))
    dispatch(setNotification(`Success: "${blog.title}" by ${blog.author} was updated.`, 3))
  }

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`Success: the blog ${blog.title} was deleted.`, 3))
    }
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title}  <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.author}</p>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} <button id='like-button' onClick={addLikes}>like</button></p>
        <p>{blog.user.name}</p>
        { blog.user.username === username && <button id='delete' style={deleteButtonstyle} onClick={removeBlog}>remove</button>}
      </div>
    </div>
  )
}


export default Blog