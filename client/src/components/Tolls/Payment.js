import { useState } from "react"
import EditForm from "./EditForm"
import classes from './User.module.css'
const Payment = (props) => {
  return( 
    <tbody>
  <tr>
 <td>{props.payment.firstName} {props.payment.lastName}</td>
  <td>{props.payment.email}</td> 
  <td>{props.payment.vehicleId}</td>
  <td>{props.payment.price}</td>
  <td>{props.payment.tollPlazaName}</td>
  <td>{props.payment.transactionID}</td>
  <td><button>Print Receipt</button></td>
  
  </tr>
  </tbody>

  )
}

export default Payment