import React from 'react';
import { useSelector } from 'react-redux'
export default function Orders(){
    const user = useSelector((state)=> state.auth.user)
    return (
        <h1>Orders</h1>
    )
}