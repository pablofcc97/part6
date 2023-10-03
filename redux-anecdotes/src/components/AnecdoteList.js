import React from "react";
import { useDispatch, useSelector } from "react-redux"
import {voteAnecdote} from './../reducers/anecdoteReducer'
import {showNotification} from './../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.filter(e => e.content.includes(state.filter)))
    //const anecdotes = useSelector(state =>state.anecdotes)

    const vote = (anecdote) => {
      //console.log('vote', id)
      const newObject = {...anecdote, votes:anecdote.votes+1}
      dispatch(voteAnecdote(newObject, anecdote.id))
      dispatch(showNotification(`You voted '${anecdote.content}'`,1000))
      //setTimeout(()=>dispatch(setNotification(``)),5000)
    }

    //const show = anecdotes.sort((a,b)=>b.votes-a.votes)

    return(
        //console.log(anecdotes)
        anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )
    )
}

export default AnecdoteList