import React from 'react'
import Footer from '../../NavFooter/Footer'
import Navbar from '../../NavFooter/NavBar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
