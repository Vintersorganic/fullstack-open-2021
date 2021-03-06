// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]



// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }


// const initialState = anecdotesAtStart.map(asObject)

import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case "INIT_ANECDOTES": 
      return action.data
    case "INCREASE_LIKES": {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id) 
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case "ADD_ANECDOTE": {
      return [...state, action.data]
    }
    default: 
      return state;
  }
}

export const increaseLikes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateAnecdotes({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: "INCREASE_LIKES",
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    }) 
  }
}

export default reducer