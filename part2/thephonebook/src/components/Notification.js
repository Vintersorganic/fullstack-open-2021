import React from 'react'

const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    else if (message.includes("Success")) {
        return (
            <div style={success}>
              {message}
            </div>
        )
    }

    return (
        <div style={error}>
          {message}
        </div>
    )
  }

export default Notification
