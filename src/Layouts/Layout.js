import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
//import '../input.css'
export default function Layout() {
  const user = useSelector((state)=> state.auth.user)
    return (
      <div className="flex flex-col h-screen justify-between ">
        <div className={`flex ${user ? 'flex-row' : 'flex-col'}`}>
          <Navbar />
          <main className={user ? 'basis-3/4' : 'w-screen'}>
            <Outlet/>
          </main>
        </div>
        <Footer />
      </div>
    );
}