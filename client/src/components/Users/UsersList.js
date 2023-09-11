import { useEffect, useState } from "react"
import Card from "../UI/Card/Card"
import classes from './User.module.css'
import User from "./User"

const UserList = (props) => {
  const [showEditForm, setShowEditFrom] = useState(false)
  const [isUserUpdated, setIsUserUpdated] =useState(false)
  if(props.users.length === 0){
    return
  }
  const updateUserHandler = async (data) => {
    const token = localStorage.getItem('token')
    console.log(data)
    const response = await fetch(`http://127.0.0.1:3000/updateUser/${data.id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(data.updates)
      })
      const userData = await response.json()

      if (response.status === 200){

        setIsUserUpdated(true)
        setShowEditFrom(false)
        props.onUpdate()
      }
  }
  return (


      <table>
      <thead>
      <tr>
        <th>Username</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile No</th>
        <th>Vehicle Type</th>
        <th>Vehicle Id</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    {props.users.map((user) => {
      return <User key={user.id} user={user} onUpdate={updateUserHandler}/>
    })} 
    </table>
  

  )
}

export default UserList