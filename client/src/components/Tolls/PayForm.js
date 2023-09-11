import Card from "../UI/Card/Card"
import { useState } from 'react';
import classes from './userForm.module.css'
import Button from "../UI/Button/Button";

const PayForm = (props) => {
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setcvv] = useState('')

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }
  const cardNumberChangeHandler = (e) => {
    setCardNumber(e.target.value)
  }
  const expiryChangeHandler = (e) => {
    setExpiry(e.target.value)
  }
  const cvvChangeHandler = (e) => {
    setcvv(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    props.onSubmit({
      name,
      cardNumber,
      expiry,
      cvv
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
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={cardNumberChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>Expiry</label>
          <input
            type="text"
            value={expiry}
            onChange={expiryChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={cvvChangeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Pay
          </Button>
        </div>
      </form>
    </Card>
    
  )
}

export default PayForm