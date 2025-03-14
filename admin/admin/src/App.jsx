import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './pages/addItems/AddItems'
import ListItems from './pages/listItems/List'
import Orders from './pages/orders/Orders'
import Navbar from './components/navbar/Navabr'

function App() {
  return (
    <div>
      <div className="content-container">
        <Navbar/>
        <Sidebar/>
        <div className="main-content">
        <Routes>
          <Route path='add' element={<AddItems/>} />
          <Route path='list' element={<ListItems/>} />
          <Route path='orders' element={<Orders/>} />
        </Routes>
        </div>
       
      </div>
    </div>
  )
}

export default App



