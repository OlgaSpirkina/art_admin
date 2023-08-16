import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
//import '../input.css'
export default function Layout() {
    return (
      <div className="flex flex-col h-screen justify-between ">
        <div className="flex flex-row">
          <Navbar />
          <main className="basis-3/4">
            <Outlet/>
          </main>
        </div>
        <Footer />
      </div>
    );
}