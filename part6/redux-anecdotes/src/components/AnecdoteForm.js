import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    
    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''      
        // dispatch(createAnecdote(content))
        // dispatch(setNotification(`you created ${content} anecdote`, 5))    
        props.createAnecdote(content)
        props.setNotification(`you created ${content} anecdote`, 5)  
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { createAnecdote, setNotification }
  )(AnecdoteForm)
