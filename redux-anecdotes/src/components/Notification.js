import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {setNotification} from './../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom:10
  }
  
  
  /*useEffect(()=>{
    setTimeout(()=>dispatch(setNotification('')),5000)
  })*/

  return (
    message==='' 
        ?<></> 
        :<div style={style} >{message}</div>
  )
}

export default Notification