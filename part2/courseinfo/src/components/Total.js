import React from 'react'

const Total = ({ parts }) => {
    const sum = parts.reduce((total, num) => total + num.exercises, 0)
    return(
      <h4>total of {sum} exercises</h4>
    ) 
  }

export default Total
