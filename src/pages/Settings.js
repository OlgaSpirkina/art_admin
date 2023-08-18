import React from 'react';
import { useSelector } from 'react-redux'
export default function Settings(){
    const user = useSelector((state)=> state.auth.user)
    return (
        <h1>Settings</h1>
    )
}