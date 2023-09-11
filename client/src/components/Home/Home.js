import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import UserList from '../Users/UsersList';
import UserFrom from '../Users/UserForm'
import Button from '../UI/Button/Button';
import TollForm from '../Tolls/TollForm'
import TollList from '../Tolls/TollList'
import TollPlaza from '../Tolls/TollPlaza';
import PaymentList from '../Tolls/PaymentList';
const Home = (props) => {
  const [userList, setUserList] = useState('')
  const [tollPlazaList, setTollPlazaList] = useState('')
  const [paymentsList, setPaymentsList] = useState('')
  const [showPaymentsList, setShowPaymentsList] = useState(false)
  const [showTollPlazaList, setShowTollPlazaList] = useState(false)
  const [showUserList, setShowUserList] = useState(false)
  const [showCreateTollPlazaForm, setShowCreateTollPlazaForm] =useState(false)
  const [isTollPlazaCreated, setIsTollPlazaCreated] = useState(false)
  const [isTollPlazaUpdated, setIsTollPlazaUpdated] = useState(false)
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const [showCreateTollPlazaError, setShowCreateTollPlazaError] = useState(false)
  const [enteredTollPlazaName, setEnteredTollPlazaName] = useState('')
  const [tollPlaza, setTollPlaza] = useState('')
  const [showSearchedTollPlaza, setShowSearchedTollPlaza] = useState(false)
  const accountType = localStorage.getItem('accountType')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    if (accountType === 'user'){
      return
    }
    const ListTollPlazaHandler = async() => {
      setShowCreateTollPlazaForm(false)
      setIsTollPlazaCreated(false)
      const response = await fetch('http://127.0.0.1:3000/getTollPlazas',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
    
      if (response.status === 200) {
        let data = await response.json();
        console.log(data)
        setTollPlazaList(data);
        setShowTollPlazaList(true)
        
      }
    }
    const ListUsersHandler = async() => {

      const response = await fetch('http://127.0.0.1:3000/listUsers',{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
    
      if (response.status === 200) {
        let data = await response.json();
        setUserList(data);
        setShowUserList(true)
        
      }
    }
    ListTollPlazaHandler()
    ListUsersHandler()
  }, [isTollPlazaUpdated,isUserUpdated, token, isTollPlazaCreated])
  
 

  const showFormHandler = () => {
    setShowUserList(false)
    setShowTollPlazaList(false)
    setShowCreateTollPlazaForm((prevState) => {
      return !prevState
    })
    setIsTollPlazaCreated(false)
    setShowCreateTollPlazaError(false)
  }
  const createTollPlazaHandler = async (data) => {
    console.log(data)
    const TollData = {
      name: data.name,
      location: data.location,
      nhNo:data.nhNo,
      state: data.state,
      section: data.section,
      price: data.price,
    }
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://127.0.0.1:3000/createTollPlaza',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(TollData)
      })
      const responseBody = await response.json()
      console.log(responseBody)
      if (response.status === 201){
        setIsTollPlazaCreated(true)
      }
      if (responseBody.error){
        setShowCreateTollPlazaError((prevState) =>{
          return !prevState
        })
      }
    } catch (error) {
      console.log(error.error)
    }
    setShowCreateTollPlazaForm(false)
  }

  const searchTollPlazaHandler = async() => {
    const tollData = {
      name: enteredTollPlazaName
    }
    console.log(tollData)
    const response = await fetch('http://127.0.0.1:3000/getTollPlazaByName',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'body': JSON.stringify(tollData)
    })
  
    if (response.status === 200) {
      let data = await response.json();
      console.log(data)
      setTollPlaza(data);
      setShowSearchedTollPlaza((prevState)=> {
        return !prevState
      })
      
    }
  }
  const viewPaymentsHandler = async() => {
    const response = await fetch('http://127.0.0.1:3000/showPaymentDetails',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  
    if (response.status === 200) {
      let data = await response.json();
      console.log(data)
      setPaymentsList(data)
      setShowPaymentsList((prevState) => {
        return !prevState
      })
      
    }
  }


  const reloadUsersHandler = () => {
    setIsUserUpdated((prevState) => {
      return !prevState
    })
  }
  const setEnteredTollPlazaHandler = (e) => {
    setEnteredTollPlazaName(e.target.value)
  }
  const reloadTollPlazaHandler = () => {
    setIsTollPlazaUpdated((prevState) => {
      return !prevState
    })
  }
  return (
    <div>
    
      <Card className={classes.home}>
      <h1>Welcome {props.onLogin}!</h1>
      {accountType === 'admin' &&
      <div>
      <Button onClick={showFormHandler}>Add Toll Plaza</Button>
      </div>
      }
      {accountType === 'user' && <div>
      <div className={classes.actions}>
      <Button onClick={viewPaymentsHandler}>View All Payments</Button>
      </div>
      <div className={classes.control}>
      <label>Toll Plaza Name</label>
          <input
            type="text"
            value={enteredTollPlazaName}
            onChange={setEnteredTollPlazaHandler}
            required
          />
      <div className={classes.actions}>
      <Button onClick={searchTollPlazaHandler}>Search</Button>
      </div>
      </div>
      </div>
      }
      {showCreateTollPlazaError && <div>Unable to Create Toll Plaza</div>}
      {isTollPlazaCreated && <h1>Toll Plaza Created</h1>}
      </Card>
      {showSearchedTollPlaza && <div><h2 style={{textAlign: 'center'}}>Toll Plaza</h2><TollPlaza tollPlaza = {tollPlaza}></TollPlaza></div>}
      {showPaymentsList && <div><h2 style={{textAlign: 'center'}}>Payments</h2><PaymentList payments = {paymentsList}></PaymentList></div>}
      {showCreateTollPlazaForm && <div><h2 style={{textAlign: 'center'}}>Add Toll Plaza</h2><TollForm onSubmit={createTollPlazaHandler}/></div>}
      {showTollPlazaList && <div><h2 style={{textAlign: 'center'}}>Toll Plazas</h2><TollList tollPlazas = {tollPlazaList} onUpdate={reloadTollPlazaHandler} /></div>}
      {showUserList && <div><h2 style={{textAlign: 'center'}}>Users</h2><UserList users = {userList} onUpdate={reloadUsersHandler} /></div>}
    
    </div>
  );
};

export default Home;
