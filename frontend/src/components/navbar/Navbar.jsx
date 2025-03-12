import React, { useState } from 'react'
import './Navbar.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Navbar({setShowLogin}) {
    const [menu, setMenu] = useState("Home")
  return (
    <div className='navbar'>
        <h1 className='navbar-logo'>Food Fiesta</h1>
        <div className="navbar-menu">
            <ul className='navbar-menu-list'>
            <li onClick={()=>setMenu("Home")} className={menu ==="Home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("Menu")} className={menu ==="Menu"?"active":""}>Menu</li>
            <li onClick={()=>setMenu("Contact-us")} className={menu ==="Contact-us"?"active":""}>Contact us</li>
            </ul>
        <div className='navbar-buttons'>
            {/* <SearchOutlinedIcon className='search-icon'/>
            <input type='text' placeholder='Search...' className='search-input'/>
            <ShoppingCartOutlinedIcon className='cart-icon'/> */}
            <button className='secondary-button' onClick={()=> setShowLogin(true)}>Log In</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
