import React, { useContext, useState } from 'react';
import './Navbar.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import  { StoreContext } from '../../context/Context';
import Badge from '@mui/material/Badge'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("Home");
  const { cartItems, token,setToken} = useContext(StoreContext);
  const cartItemCount= Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
const navigate = useNavigate()
  const logout = ()=>{
 localStorage.removeItem("token")
 setToken("")
 navigate("/")
}

return (
  <div className='navbar'>
    <Link to='/'>
      <h1 className='navbar-logo'>Food Fiesta</h1>
    </Link>

    <div className="navbar-menu">
      <ul className='navbar-menu-list'>
        <Link to='/'>
          <li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li>
        </Link>
        <Link to='/menu'>
          <li onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</li>
        </Link>
        <Link to='/about-us'>
          <li onClick={() => setMenu("About-us")} className={menu === "About-us" ? "active" : ""}>About us</li>
        </Link>
      </ul>

      <div className='navbar-buttons'>
        <SearchOutlinedIcon className='search-icon' />
        <input type='text' placeholder='Search...' className='search-input' />
        <Link to='/cart'>
        <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartOutlinedIcon className='cart-icon' onClick={() => setMenu("cart")} />
            </Badge>
        </Link>
        {!token? <button className='secondary-button' onClick={() => setShowLogin(true)}>Sign in</button> :
        <div className="navbar-profile">
          <AccountCircleOutlinedIcon/>
          <ul className='navbar-profile-dropdown'>
            <li>
            <ShoppingBagOutlinedIcon/> Orders
            
            </li>
            <li onClick={logout}>
            <LogoutOutlinedIcon/> Logout
            </li>
          </ul>
        

        </div> }
       
      </div>
    </div>
  </div>
);
}

export default Navbar;