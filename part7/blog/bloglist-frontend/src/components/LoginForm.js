import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username, '|| username ||', password, '|| password ||')
    dispatch(login({ username, password }))
    dispatch(setNotification(`Welcome ${username}!`, 3))
  }


  return (
    <form onSubmit={handleLogin}>

      <div>
        <TextField
          label='Username'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)
          }/>
      </div>

      <div>
        <TextField
          label='Password'
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)
          }/>
      </div>

      <Button variant="contained" color="primary" id='login-button' type="submit">login</Button>

    </form>
  )
}

export default LoginForm
