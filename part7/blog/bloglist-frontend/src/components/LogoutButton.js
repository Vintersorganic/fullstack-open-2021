import React from 'react'

const LogoutButton = ( { setUser } ) => {

  return (
    <button onClick={() => {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    }}>
            logout
    </button>
  )
}

export default LogoutButton
