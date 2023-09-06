import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom";
import { auth } from './FirebaseConfig';
import { ToastContainer,toast } from 'react-toastify';

const ProtectedRoute = ({children}) => {
 const User=auth.currentUser;
    if(!User) {
        console.error("Please Login to access WishList");
        return <><ToastContainer/><Navigate to="/" /></>
    }
    else{
        return children;
    }
 return children

};

export default ProtectedRoute;