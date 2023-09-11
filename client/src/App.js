import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import UserForm from './components/Users/UserForm';
import IndexPage from './components/Index/IndexPage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState('')
  const [showSignupFrom, setShowSignupForm] = useState(false)
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false)
  const [showSignupErrorMessage, setShowSignupErrorMessage] = useState(false)
  const [showLoginForm, setShowLoginFrom] = useState(false)
  useEffect(()=> {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token){
      setIsLoggedIn(true)
    }
    if (username){
      setUserData(username)
    }

  }, [])

  const loginHandler = async(loginInformation) => {
    console.log(loginInformation)
    try {
      const response = await fetch('http://127.0.0.1:3000/login',{
        method:'POST',
        body: JSON.stringify(loginInformation),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      const data = {
        ...responseData,
      }
      console.log(data)
      if (!data.error){
        setUserData(data.username)
        setIsLoggedIn(true)
        setShowLoginFrom(false)
        setShowLoginErrorMessage(false)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('accountType', data.role)
        localStorage.setItem('accountId', data.id)
      }
      else{
        throw new Error("User Not Registered")
      }
    } catch (error) {
      setShowLoginErrorMessage((prevState) => {
        return !prevState
      })
    }    
  };
  const logoutHandler =async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://127.0.0.1:3000/logout',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
      })
      if(response.status === 200){
        setIsLoggedIn(false)
        localStorage.clear()
      }

    } catch (error) {
      
    }

  };

  const signupHandler =() => {
    setShowSignupForm((prevState) => {
      return(!prevState)
    })
  }
  const loginFromHandler = () => {
    setShowLoginFrom((prevState) => {
      return(!prevState)
    })
  }
  const adminSignupHandler = async(data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email:data.email,
      phoneNo: data.mobileNo,
      username: data.username,
      password: data.password,
      vehicleId: data.vehicleId,
      vehicleType: data.vehicleType,
      role: "user"
    }
    const response = await fetch('http://127.0.0.1:3000/signup',{
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      'body': JSON.stringify(userData)
    })
    const responseData = await response.json()
    console.log(responseData)
    if (response.status !== 400){
      setIsLoggedIn(false)
      setShowSignupForm(false)
    }
    if(responseData.error)  {
      setShowSignupErrorMessage((prevState) => {
        return !prevState
      })
    }
  }

  return (
    <React.Fragment>
      
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} signup={signupHandler} login={loginFromHandler}/>
      {showSignupFrom ? <main><UserForm onSubmit={adminSignupHandler} signupError={showSignupErrorMessage}/> </main>:
      <main>
        {!isLoggedIn && !showLoginForm && <IndexPage/>}
        {showLoginForm && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} onLogin={userData}/>}
        {showLoginErrorMessage && <div>Unable to Login</div>}
      </main>
}
    </React.Fragment>
  );
}

export default App;
