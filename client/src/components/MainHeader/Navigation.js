import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
      {!props.isLoggedIn && (
          <li>
            <button onClick={props.onLogin}>Signin</button>
          </li>
        )}
        {!props.isLoggedIn && (
          <li>
            <button onClick={props.onSignup}>Signup</button>
          </li>
        )}
        
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
