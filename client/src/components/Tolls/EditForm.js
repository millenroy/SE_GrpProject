import { useRef, useState } from "react"
import Card from "../UI/Card/Card"
import classes from './EditForm.module.css'
const EditForm =(props)=>{
  const [formValues, setFormValues] = useState(props.tollPlaza)
  const setNameValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        name: e.target.value
      }
    })
  }
  const setLocationValue = (e) => {
    setFormValues((prevState) => {
      return{
        ...prevState,
        location: e.target.value
      }
    })
  }
  const setnhNoValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        nhNo: e.target.value
      }
    })
  }
  const setStateValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        state: e.target.value
      }
    })
  }
  const setSectionValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        section: e.target.value
      }
    })
  }
  const setPriceValue = (e)=> {
    setFormValues((prevState) => {
      return{
        ...prevState,
        price: e.target.value
      }
    })
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    const updateOptions = {}
    for(const item in props.tollPlaza){
      if (props.tollPlaza[item] !== formValues[item]){
        updateOptions[item] = formValues[item]
      }
    }
    props.onSubmit(updateOptions)
    
  }
  return(
    <div className={classes.createUser}>
    <form action="" onSubmit={submitFormHandler} >
       <div className={classes.control}>
      <label htmlFor="">Name</label>
      <input type="text" required value={formValues.name} onChange={setNameValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Location</label>
      <input type="text" required value={formValues.location} onChange={setLocationValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">nhNo</label>
      <input type="text" required value={formValues.nhNo} onChange={setnhNoValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">State</label>
      <input type="text" required value={formValues.state} onChange={setStateValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Section</label>
      <input type="text" required value={formValues.section} onChange={setSectionValue}/>
      </div>
      <div className={classes.control}>
      <label htmlFor="">Price</label>
      <input type="text" value={formValues.price} onChange={setPriceValue}/>
      </div>
      <div className={classes.action}>
      <input type="submit" />
      </div>

    </form>
    </div>

  )
}

export default EditForm