import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogCreation = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    try {
      event.preventDefault()
      dispatch(addBlog({
        title, author, url
      }))
      dispatch(setNotification(`Success: added blog "${title}" by ${author}.`, 3))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception) {
      dispatch(setNotification('Cannot add blog!', 3))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        <div>title: <input id="title" value={title} onChange={( { target } ) => setTitle(target.value)} /></div>
        <div>author: <input id="author" value={author} onChange={( { target } ) => setAuthor(target.value)} /></div>
        <div>url: <input id="url" value={url} onChange={( { target } ) => setUrl(target.value)} /></div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}

export default BlogCreation
