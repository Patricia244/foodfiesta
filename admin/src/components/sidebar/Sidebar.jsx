import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Divider from '@mui/material/Divider';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <h1 className="logo">Food Fiesta</h1> 
      <Divider />
      <div className="Sidebar">
        <div className="sidebarWrapper">
          <NavLink to="/add" className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}>
            <AddCircleOutlineIcon />
            <p>Add items</p>
          </NavLink>
          <NavLink to="/list" className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}>
            <FormatListBulletedIcon />
            <p>List items</p>
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}>
            <ShoppingCartCheckoutIcon />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;