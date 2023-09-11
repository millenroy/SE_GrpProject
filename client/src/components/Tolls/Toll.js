import { useState } from "react"
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
    console.log(data)
    props.onUpdate({
      updates:data,
      id:props.tollPlaza.id
    })
    setShowEditFrom(false)
  }
  const deleteTollPlazaHandler = (data) => {
    console.log(data)
    props.onDelete({
      id:props.tollPlaza.id
    })
    setShowEditFrom(false)
  }
  return( 
    <tbody>
  <tr>
 <td>{props.tollPlaza.name}</td>
  <td>{props.tollPlaza.location}</td> 
  <td>{props.tollPlaza.nhNo}</td>
  <td>{props.tollPlaza.state}</td>
  <td>{props.tollPlaza.section}</td>
  <td>{props.tollPlaza.price}</td>
  <td>{new Date(props.tollPlaza.createdAt).toUTCString()}</td>
  <td><button onClick={editFormHandler}>Edit</button> <button onClick={deleteTollPlazaHandler}>Delete</button></td>
  
  </tr>
  {showEditForm && <EditForm onSubmit={formSubmitHandler} tollPlaza={props.tollPlaza}/>}
  </tbody>
  

  )
}

export default User