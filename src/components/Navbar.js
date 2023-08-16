import React from 'react'
import { NavLink } from 'react-router-dom'
import { LiaCogSolid } from 'react-icons/lia'
import { AiOutlineHome } from 'react-icons/ai'
import { BiStore } from 'react-icons/bi'
import { BsListUl, BsBox } from 'react-icons/bs'

export default function Navbar(){
    return (
        <aside className="p-4">
            <NavLink to="/"
                className="flex gap-1 mb-4"
            >
                <BiStore />
                <span>#ART ADMIN</span>
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
    )
}