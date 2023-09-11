import { useRef, useState } from "react"
import Card from "../UI/Card/Card"
import classes from './EditForm.module.css'
const EditForm =(props)=>{
  const [formValues, setFormValues] = useState(props.user)
  const setFirstNameValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        firstName: e.target.value
      }
    })
  }
  const setLastNameValue = (e) => {
    setFormValues((prevState) => {
      return{
        ...prevState,
        lastName: e.target.value
      }
    })
  }
  const setEmailValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        email: e.target.value
      }
    })
  }
  const setUsernameValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        username: e.target.value
      }
    })
  }
  const setPasswordValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        password: e.target.value
      }
    })
  }
  const setVehicleTypeValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        vehicleType: e.target.value
      }
    })
  }
  const setVehicleIdValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        vehicleId: e.target.value
      }
    })
  }
  const setMobileNoValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        phoneNo: e.target.value
      }
    })
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    const updateOptions = {}
    for(const item in props.user){
      if (props.user[item] !== formValues[item]){
        updateOptions[item] = formValues[item]
      }
    }
    props.onSubmit(updateOptions)
    
  }
  return(
    <div className={classes.createUser}>
    <form action="" onSubmit={submitFormHandler} >
       <div className={classes.control}>
      <label htmlFor="">First Name</label>
      <input type="text" required value={formValues.firstName} onChange={setFirstNameValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Last Name</label>
      <input type="text" required value={formValues.lastName} onChange={setLastNameValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Email</label>
      <input type="email" required value={formValues.email} onChange={setEmailValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Username</label>
      <input type="text" required value={formValues.username} onChange={setUsernameValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Mobile No</label>
      <input type="text" value={formValues.phoneNo} onChange={setMobileNoValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Vehicle Type</label>
      <input type="text" value={formValues.vehicleType} onChange={setVehicleTypeValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Vehicle Id</label>
      <input type="text" value={formValues.vehicleId} onChange={setVehicleIdValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Password</label>
      <input type="password" value={formValues.password} onChange={setPasswordValue}/>
      </div>
      <div className={classes.action}>
      <input type="submit" />
      </div>

    </form>
    </div>

  )
}

export default EditForm