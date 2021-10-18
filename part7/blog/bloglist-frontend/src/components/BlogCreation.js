import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  TextField,
  Button
} from '@material-ui/core'

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
        <div><TextField label='Title' id="title" value={title} onChange={( { target } ) => setTitle(target.value)} /></div>
        <div><TextField label='Author' id="author" value={author} onChange={( { target } ) => setAuthor(target.value)} /></div>
        <div><TextField label='URL' id="url" value={url} onChange={( { target } ) => setUrl(target.value)} /></div>
        <Button type="submit">create</Button>
      </form>
    </div>

  )
}


export default BlogCreation
