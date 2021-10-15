import React from 'react'
import { useSelector } from 'react-redux'

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


const Notification = () => {
  const notification = useSelector(state => state.notifications)

  if (notification === null) {
    return null
  }

  else if (notification.includes('Success')) {
    return (
      <div id='success' style={success}>
        {notification}
      </div>
    )
  }

  return (
    <div id='error' style={error}>
      {notification}
    </div>
  )
}

export default Notification