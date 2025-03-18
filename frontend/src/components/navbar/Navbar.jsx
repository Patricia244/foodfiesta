import React, { useContext, useState } from 'react';
import './Navbar.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/Context';
import Badge from '@mui/material/Badge';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("Home");
  const { cartItems, token, setToken } = useContext(StoreContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToFeaturedProducts = () => {
    const featuredProductsSection = document.getElementById('featured-products');
    if (featuredProductsSection) {
      featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='navbar'>
      <Link to='/'>
        <h1 className='navbar-logo'>Food Fiesta</h1>
      </Link>
      <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className='navbar-menu-list'>
          <Link to='/'>
            <li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li>
          </Link>
          <Link>
            <li onClick={() => { setMenu("Menu"); scrollToFeaturedProducts(); }} className={menu === "Menu" ? "active" : ""}>Menu</li>
          </Link>
          <Link to='/cart'>
            <li>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartOutlinedIcon className='cart-icon' onClick={() => setMenu("cart")} />
              </Badge>
            </li>
          </Link>
        </ul>
        <div className='navbar-buttons'>
          {!token ? (
            <button className='secondary-button' onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <AccountCircleOutlinedIcon className='profile-icon' />
              <ul className='navbar-profile-dropdown'>
                <li>
                  <Link to='/myOrders'>
                    <ShoppingBagOutlinedIcon /> Orders
                  </Link>
                </li>
                <li onClick={logout}>
                  <LogoutOutlinedIcon /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;