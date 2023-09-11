import { useState, useEffect } from "react"
import EditForm from "./EditForm"
import classes from './User.module.css'
const User = (props) => {
  const [showEditForm, setShowEditFrom] = useState(false)


  const editFormHandler = () => {
    setShowEditFrom((prevState) => {
      return !prevState
    })
  }
  const formSubmitHandler = (data) => {
    props.onUpdate({
      updates:data,
      id:props.user.id
    })
    setShowEditFrom(false)
  }
  return( 
    <tbody>
  <tr>
 <td>{props.user.username}</td>
  <td>{props.user.firstName} {props.user.lastName}</td> 
  <td>{props.user.email}</td>
  <td>{props.user.phoneNo}</td>
  <td>{props.user.vehicleType}</td>
  <td>{props.user.vehicleId}</td>
  <td>{new Date(props.user.createdAt).toUTCString()}</td>
  
  <td><button onClick={editFormHandler}>Edit</button></td>
  </tr>
  {showEditForm && <EditForm onSubmit={formSubmitHandler} user={props.user}/>}
  </tbody>
  

  )
}

export default User