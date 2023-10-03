import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type){
    case 'vote' : 
      const newState = state.map(e => e.id === action.id ? {...e, votes:e.votes+1} : e)
      return newState
    case 'create':
      const newAnecdote = asObject(action.anecdote)
      return state.concat(newAnecdote)
    default: return state
  }
}

export const vote = (id) => {
  return{
    type: 'vote',
    id: id
  }
}

export const create = (anecdote) => {
  return{
    type: 'create',
    anecdote: anecdote
  }
}*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  //initialState,
  initialState: [],
  reducers: {
    vote(state, action) {
      //console.log(JSON.parse(JSON.stringify(state)))
      return state.map(e => e.id === action.payload.id ? {...e, votes:e.votes+1} : e)
    },
    create(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})





export const {vote, create, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (newObject, id) => {
  return async dispatch  => {
    const updatedAnecdote = await anecdoteService.vote(newObject,id)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer