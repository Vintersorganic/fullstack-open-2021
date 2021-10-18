// // import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { blogUpdate, addComments } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Container, TextField } from '@material-ui/core'
import React from 'react'


const Blog = ( { blog } ) => {

  const dispatch = useDispatch()
  const addLikes = () => {
    const { user, ...restBlog } = blog
    console.log(user, '**')
    dispatch(blogUpdate({ user: user.id, ...restBlog }))
    dispatch(setNotification(`Success: "${blog.title}" by ${blog.author} was updated.`, 3))
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(addComments(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  if (!blog) {
    return null
  }

  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>{ blog.title } -  { blog.author }</h1>
      <a href={ blog.url }>{blog.url}</a>
      <p style={{ verticalAlign: 'center', mt: 5 }}>{blog.likes} likes
        <Button sx={{ verticalAlign: 'center' }} onClick={addLikes}>like</Button>
      </p>
      <p>Added by { blog.user.name }</p>

      <h3 align='left' style={{ marginTop: 20 }}>Comments</h3>
      <form align='left' onSubmit={addComment}>
        <TextField label='Write your comment' name='comment'/>
        <Button type='submit'> Comment </Button>
      </form>

      <ul style={{ textAlign:'left', paddingLeft: 0 }}>
        {blog.comments.map(comment =>
          <li key={comment} style={{ listStyle: 'none'  }}>
            { comment } {console.log(comment)}
          </li>
        )}
      </ul>

    </Container>
  )
}

export default Blog
