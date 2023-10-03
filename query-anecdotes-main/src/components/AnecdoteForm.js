import { useMutation,  useQueryClient } from 'react-query'
import { createAnecdote } from '../request'

import { useContext } from 'react'
import NotificationContext from '../notificationContext'


const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const QueryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: (newAnecdote) => {
      console.log(newAnecdoteMutation)
      QueryClient.invalidateQueries('anecdotes')
      notificationDispatch({type:'SHOW', payload:'Note added'})
      setTimeout(()=>notificationDispatch({type:'HIDE'}),2000)
      /*const anecdotes = QueryClient.getQueryData('anecdotes')
      QueryClient.setQueryData('anecdotes', anecdotes.map(e => e.id === newAnecdote.id ?newAnecdote :e))*/
    },
    onError: (error) => {
      console.log(error.response.data)
      notificationDispatch({type:'SHOW', payload:'ERROR: anecdote to short'})
      setTimeout(()=>notificationDispatch({type:'HIDE'}),2000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
