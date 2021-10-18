import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  Switch, Route, Redirect
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogCreation from './components/BlogCreation'
import UserInfo from './components/UserInfo'
import Navbar from './components/Navbar'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const blogMatch = useRouteMatch('/blogs/:id')

  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null


  return (

    <Container>
      <Navbar />
      <Notification />
      <h2 style={{ textAlign: 'center' }}>Blog App</h2>
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blog}/>
        </Route>
        <Route path='/users/:id'>
          <UserInfo selectedUser={selectedUser}/>
        </Route>
        <Route path='/users'>
          { user ? <UserList /> : <Redirect to="/" /> }
        </Route>
        <Route path='/'>
          <h1 style={{ 'textAlign':'center' }}>Bloglist</h1>
          { user === null ?
            <LoginForm
            /> :
            <Togglable buttonLabel="create new blog" >
              <BlogCreation />
            </Togglable>
          }
          <BlogList username={user ? user.username : ''}/>
        </Route>
      </Switch>
    </Container>

  )
}

export default App