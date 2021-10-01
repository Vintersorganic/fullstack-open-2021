import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import BlogCreation from './components/BlogCreation'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [erorrMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogCreation = async (newBlog) => {
    try {
      const blogObject = await blogService
        .create(newBlog)
      setBlogs(blogs.concat(blogObject))
      setErrorMessage(`Success: added blog "${newBlog.title}" by ${newBlog.author}.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Cannot add blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogUpdate = async (newBlog) => {
    try {
      const updatedBlog = await blogService
        .update(newBlog)
      setErrorMessage(`Success: "${newBlog.title}" by ${newBlog.author} was updated.`)
      setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : updatedBlog))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Cannot update blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogToBeDeleted) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${blogToBeDeleted.title}?`)) {
        blogService.destroy(blogToBeDeleted.id)
        setErrorMessage(`Success: the blog ${blogToBeDeleted.title} was deleted.`)
        setBlogs(blogs.filter(blog => blog.id !== blogToBeDeleted.id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage('Cannot delete blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification  erorrMessage={erorrMessage}/>
      {user !== null && <p>{user.name} logged in. <LogoutButton setUser={setUser}/></p> }
      { user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        /> :
        <Togglable buttonLabel="create new blog" >
          <BlogCreation blogCreation={blogCreation}/>
        </Togglable>
      }
      { blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogUpdate={blogUpdate} deleteBlog={deleteBlog} username={user.username}/>
      )}
    </div>
  )
}


export default App