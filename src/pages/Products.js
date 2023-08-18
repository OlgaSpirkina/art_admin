import React from 'react';
import { useSelector } from 'react-redux'
export default function Products(){
    const user = useSelector((state)=> state.auth.user)
    return (
        <h1>Products</h1>
    )
}