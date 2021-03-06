import React, { useState } from 'react'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"
import  { useField } from './hooks'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import About from './components/About'

console.log( useField , "USEFIELD");

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const match = useRouteMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000)

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    
    <div>
      <h1>Software anecdotes</h1>
      
      <Menu />
      <p>{notification}</p>
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create"> 
           <CreateNew addNew={addNew} /> 
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>    
      </Switch>

      <Footer />

    </div>
  )
}

export default App;