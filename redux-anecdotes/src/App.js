import React,{useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes, setAnecdotes} from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
const dispatch = useDispatch()
useEffect(() => {
  dispatch(initializeAnecdotes())
},[dispatch])

  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App