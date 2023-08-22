import { auth, provider } from './FirebaseConfig';
import { useState, useRef, useEffect } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Email() { 
  
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSessionTimeout((prevTimeout) => prevTimeout - 1);
  //   }, 1000);
  //   if (sessionTimeout === 0) {
  //     clearInterval(timer);
  //     handleLogout();
  //   }

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [sessionTimeout]);

  // useEffect(() => {
  //   resetSessionTimeout();
  // }, [user]);

  // const resetSessionTimeout = () => {
  //   setSessionTimeout(600);
  // };

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        setUser(user);
        console.log("user name: "+user.displayName)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const forms = useRef();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return (
    <div >
      <div >
        {user ? (
            <div >
              <h3 >Welcome {user.displayName}</h3>

              <div >
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div>
              <br />
              <div>
                <Button variant='outlined'  onClick={handleLogout}>
                  LOGOUT
                </Button>
              </div>    
            </div>
        ) : (
          <Button variant="outlined" onClick={handleGoogleSignIn}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Email;