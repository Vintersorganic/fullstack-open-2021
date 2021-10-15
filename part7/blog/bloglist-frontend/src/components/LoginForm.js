import React from 'react'

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>username: <input id='username' value={username} onChange={({ target }) => setUsername(target.value)}/></div>
      <div>password: <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm
