import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>TOLL PLAZA SYSTEM</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} onSignup={props.signup} onLogin={props.login}/>
    </header>
  );
};

export default MainHeader;
