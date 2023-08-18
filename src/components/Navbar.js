import React from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'
import { LiaCogSolid } from 'react-icons/lia'
import { AiOutlineHome } from 'react-icons/ai'
import { BiStore } from 'react-icons/bi'
import { BsListUl, BsBox } from 'react-icons/bs'


export default function Navbar(){
    const location = useLocation();
    let signupOrSignin = 'Sign Up';
    let linkToLocation = '/signup';
    (location.pathname === "/") ? signupOrSignin = 'Sign Up' : signupOrSignin = 'Sign In';
    (location.pathname === "/") ? linkToLocation = '/signup' : linkToLocation = '/';
    const broadcastChannel = new BroadcastChannel('session-expiration');
    const user = useSelector((state)=> state.auth.user)
    const dispatch = useDispatch()
    console.log()
    return (
        <>
        {
            user ?
            <aside className="basis-1/4 p-4">
                <NavLink to="/"
                    className="flex gap-1 mb-4"
                >
                    <BiStore />
                    <span>#ART ADMIN</span>
                </NavLink>
                <NavLink to="/" onClick={()=> dispatch(logout())}>
                    <Logout broadcastChannel={broadcastChannel} />
                </NavLink>
                <nav className="flex flex-col gap-2">
                    <NavLink 
                        className={({isActive})=> isActive ? "active-link flex gap-1" : "flex gap-1"}
                        to="/">
                        <AiOutlineHome />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> isActive ? "active-link flex gap-1" : "flex gap-1"}
                        to="/products">
                        <BsListUl />
                        <span>Products</span>
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> isActive ? "active-link flex gap-1" : "flex gap-1"}
                        to="/orders">
                        <BsBox />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> isActive ? "active-link flex " : "flex "}
                        to="/settings">
                        <LiaCogSolid />
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </aside>
                :
            <nav className="flex items-center justify-between w-full h-16 py-2 bordere-b px-28 mb-2 border-cyan-400">
                <NavLink to="/"
                    className="flex gap-1 mb-4"
                >
                    <BiStore />
                    <span>#ART ADMIN</span>
                </NavLink>
                <NavLink to={linkToLocation}>
                    {signupOrSignin}
                </NavLink>
            </nav>
        }
        </>
    )
}