import React from 'react';
import { useSelector } from 'react-redux'
import { login } from '../store/authSlice';
import Signin from './Signin';
export default function Dashboard(){
    const user = useSelector((state)=> state.auth.user)
    return (
        <>
            { user ? <h4>Hi, {user}</h4> : null}
        </>
    )
}