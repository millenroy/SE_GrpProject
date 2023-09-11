import { useState } from "react"
import Card from "../UI/Card/Card"
import classes from './User.module.css'
import Toll from "./Toll"

const UserList = (props) => {
  const [showEditForm, setShowEditFrom] = useState(false)
  const [isTollPlazaUpdated, setIsTollPlazaUpdated] =useState(false)
  if(props.tollPlazas.length === 0){
    return 
  }
  const editFormHandler = () => {
    setShowEditFrom(true)
  }
  const updateTollPlazaHandler = async (data) => {
    console.log(data)
    const token = localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:3000/tollPlazas/${data.id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(data.updates)
      })
      const tollPlazaData = await response.json()

      if (response.status === 200){

        setIsTollPlazaUpdated(true)
        setShowEditFrom(false)
        props.onUpdate()
      }
  }
  const deleteTollPlazaHandler = async (data) => {
    console.log(data)
    const token = localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:3000/tollPlazas/${data.id}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      })

      if (response.status === 200){
        props.onUpdate()
      }
  }
  return (


      <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>nhNo</th>
        <th>State</th>
        <th>Section</th>
        <th>Price</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    {props.tollPlazas.map((tollPlaza) => {
      return <Toll key={tollPlaza.id} tollPlaza={tollPlaza} onUpdate={updateTollPlazaHandler} onDelete={deleteTollPlazaHandler}/>
    })} 
    </table>
  

  )
}

export default UserList