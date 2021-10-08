import { connect } from 'react-redux'
import { increaseLikes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import React from 'react'


const AnecdoteList = (props) => {
  const voteId = (anecdote) => {
      props.increaseLikes(anecdote)
      props.setNotification(`you created ${anecdote.content} anecdote`, 5)
  }

  return (
      <div>
          {props.anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                  <div>
                      {anecdote.content}
                  </div>
                  <div>
                      has {anecdote.votes}
                      <button onClick={() => voteId(anecdote)}>vote</button>
                  </div>
              </div>
          )}
      </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const sortedAnecdotes = [...anecdotes].sort((a, b) => {
      return b.votes - a.votes
  })

  if (filter === '') {
      return sortedAnecdotes
  } else {
      return sortedAnecdotes.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
  }
}

const mapStateToProps = (state) => {
  return {
      anecdotes: anecdotesToShow(state),
  }
}

export default connect(
  mapStateToProps,
  { increaseLikes, setNotification }
)(AnecdoteList)