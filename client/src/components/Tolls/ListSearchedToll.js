import { useState } from "react"
import EditForm from "./EditForm"
import classes from './User.module.css'
import PayForm from "./PayForm"

const ListSearchedToll = (props) => {
  const [showEditForm, setShowEditFrom] = useState(false)
  const editFormHandler = () => {
    setShowEditFrom((prevState) => {
      return !prevState
    })
  }
  const payTollHandler = async(data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:3000/payToll/${props.tollPlaza.id}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  
    if (response.status === 200) {
      let data = await response.json();
      console.log(data)
      // setTollPlaza(data);
      // setShowSearchedTollPlaza(true)
      
    }
    alert("Toll Paid Successfully")
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
  <td><button onClick={editFormHandler}>Pay</button> </td>
  </tr>
  {showEditForm && <PayForm onSubmit={payTollHandler} tollPlaza={props.tollPlaza}/>}
  </tbody>
  

  )
}

export default ListSearchedToll