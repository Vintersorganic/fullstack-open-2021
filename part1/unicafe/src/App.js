import React, { useState } from 'react'

const Button = ( { text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ( { text, feedback }) => {
  return (
      <tr>
        <th align= "left">{text}:</th>
        <td>{feedback}</td>
      </tr>
  )
}

const Statistics  = ( { good, bad, neutral }) => {
  let all = good+neutral+bad
  let average = (good - bad)/all
  let positive = (good/all)*100 + "%"
  if (all <= 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" feedback={good}/>
          <StatisticLine text="neutral" feedback={neutral}/>
          <StatisticLine text="bad" feedback={bad}/>
          <StatisticLine text="all" feedback={all}/>
          <StatisticLine text="average" feedback={average}/>
          <StatisticLine text="positive" feedback={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1> 
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App