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


const Notification = ({ erorrMessage }) => {
  if (erorrMessage === null) {
    return null
  }

  else if (erorrMessage.includes('Success')) {
    return (
      <div id='success' style={success}>
        {erorrMessage}
      </div>
    )
  }

  return (
    <div id='error' style={error}>
      {erorrMessage}
    </div>
  )
}

export default Notification