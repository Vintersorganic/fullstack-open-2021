import { useSelector, useDispatch } from 'react-redux'
import { increaseLikes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import React from 'react'


const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector( state => {
      if (state.filter === '') {
        return state.anecdotes
      }
      console.log(state.anecdotes[0], "MIRA ACA")
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().search(state.filter.toLowerCase()) !== -1)
      
      }
    )    
    
    console.log(useSelector(state => state))
    const vote = (anecdote) => {
        dispatch(increaseLikes(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (

        <div>
             {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
