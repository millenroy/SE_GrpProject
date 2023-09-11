import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin({username:enteredUsername, password:enteredPassword});
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={classes.control}
        >
          <label>Username</label>
          <input
            type="test"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            required
          />
        </div>
        <div
          className={classes.control}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
