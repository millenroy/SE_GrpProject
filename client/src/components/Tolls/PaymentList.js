import { useState } from "react"
import Card from "../UI/Card/Card"
import classes from './User.module.css'
import Toll from "./Toll"
import Payment from "./Payment"

const PaymentList = (props) => {
  if(props.payments.length === 0){
    return 
  }
  return (


      <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Vehicle Id</th>
        <th>Price</th>
        <th>Toll Plaza Name</th>
        <th>TransactionID</th>
        <th>Actions</th>
      </tr>
    </thead>
    {props.payments.map((payment) => {
      return <Payment key={payment.transactionID} payment={payment} />
    })} 
    </table>
  

  )
}

export default PaymentList