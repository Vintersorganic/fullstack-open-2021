import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'
import LogoutButton from './LogoutButton'



const Navbar = () => {
  const user = useSelector(state => state.user)
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color="inherit" component={Link} to='/'>
               blogs
        </Button>
        <Button color="inherit"  component={Link} to='/users'>
                users
        </Button>
        { user &&
               <em>{user.name} logged in. <LogoutButton /></em>
        }
      </Toolbar>
    </AppBar>
  )
}

// { user === null ?
//   <LoginForm
//   />


export default Navbar
