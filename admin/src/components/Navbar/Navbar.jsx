import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets.js'
import {Link} from 'react-router-dom'
const Navbar = () => {
  
  return (
    <div className="navbar">
      <Link to="/"> 
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
      </Link>
    </div>
  )
}

export default Navbar