import React from "react";
import { useDispatch } from "react-redux";
import {create, createAnecdote} from './../reducers/anecdoteReducer'
import {showNotification} from './../reducers/notificationReducer'
import noteService from './../services/anecdotes'

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
      dispatch(showNotification(`Anecdote added`,5000))
      //setTimeout(()=>dispatch(setNotification(``)),5000)
    }

    return(
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    )
}

export default AnecdoteForm