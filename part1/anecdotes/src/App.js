import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomNumber = () => Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(randomNumber)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
  console.log(voted, "voted")
  const randomAnecdote = () => setSelected(randomNumber)

  const handleVote = () => {
    let copyVoted = [...voted]
    copyVoted[selected] += 1
    return setVoted(copyVoted)
  }

 

  return (
    <div> 
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <Button onClick={handleVote} text="vote"/> 
      <Button onClick={randomAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes" />
      <MostVoted anecdotes={anecdotes} voted={voted}/>
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({ text }) => {
  return (
    <h2> {text} </h2>
  )
}

const MostVoted = ( { anecdotes, voted } ) =>{
  let mostVoted = Math.max(...voted) 
  let mostVotedIndex = voted.indexOf(mostVoted)
  return (
    <p>{anecdotes[mostVotedIndex]}</p>
  )
  
}

export default App