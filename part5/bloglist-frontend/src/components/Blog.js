import React, { useState } from 'react'

const Blog = ({ blog, blogUpdate, deleteBlog, username }) => {

  const [visible, setVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

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
    const newBlog = ({
      author: blog.author,
      id: blog.id,
      title: blog.title,
      url: blog.url,
      userId: blog.user.id,
      likes: blog.likes + 1
    })
    blogUpdate(newBlog)
    setUpdatedBlog(newBlog)
  }

  return (

    <div style={blogStyle}>
      <div>
        {updatedBlog.title} {updatedBlog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p><a href={updatedBlog.url}>{updatedBlog.url}</a></p>
        <p>{updatedBlog.likes} <button id='like-button' onClick={addLikes}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === username && <button id='delete' style={deleteButtonstyle} onClick={() => deleteBlog(blog)}>remove</button>}
      </div>
    </div>
  )
}


export default Blog