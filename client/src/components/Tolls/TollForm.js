import Card from "../UI/Card/Card"
import { useState } from 'react';
import classes from './userForm.module.css'
import Button from "../UI/Button/Button";

const TollForm = (props) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [nhNo, setnhNo] = useState('')
  const [state, setState] = useState('')
  const [section, setSection] = useState('')
  const [price, setPrice] = useState('')

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }
  const locationChangeHandler = (e) => {
    setLocation(e.target.value)
  }
  const nhNoChangeHandler = (e) => {
    setnhNo(e.target.value)
  }
  const stateChangeHandler = (e) => {
    setState(e.target.value)
  }
  const sectionChangeHandler = (e) => {
    setSection(e.target.value)
  }
  const priceChangeHandler = (e) => {
    setPrice(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    props.onSubmit({
      name,
      location,
      nhNo,
      state,
      section,
      price,
    })
  }
  return (
    <Card className={classes.createUser}>
      <form onSubmit={submitHandler}>
      <div
          className={classes.control}
        >
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={nameChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={locationChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>nhNo</label>
          <input
            type="text"
            value={nhNo}
            onChange={nhNoChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={stateChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>Section</label>
          <input
            type="text"
            value={section}
            onChange={sectionChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={priceChangeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Submit
          </Button>
        </div>
      </form>
      {props.signupError && <div>Unable to create Account</div>}
      {props.createUserError && <div>Unable to create User</div>}
    </Card>
    
  )
}

export default TollForm