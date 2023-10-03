import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote} from './request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import NotificationContext from './notificationContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'SHOW': return action.payload
    case 'HIDE': return ''
    default: return state
  }
}


const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  const QueryClient = useQueryClient()


  const newAnecdoteMutation = useMutation(voteAnecdote,{
    onSuccess: () => {
      QueryClient.invalidateQueries('anecdotes')
    },
    onError: ()=>console.log('ERROR')
  })

  const handleVote = (anecdote) => {
    notificationDispatch({type:'SHOW', payload:`${anecdote.content} voted`})
    setTimeout(()=>notificationDispatch({type:'HIDE'}),2000)
    newAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1})
  }
  

  

  const result = useQuery('anecdotes',getAnecdotes,{
    retry: 1
  })

  if (result.isLoading) {
    return <div>Loading data ...</div>
  }
  if(result.isError){
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
