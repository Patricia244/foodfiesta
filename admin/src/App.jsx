import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './pages/addItems/AddItems'
import ListItems from './pages/listItems/List'
import Orders from './pages/orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const url = process.env.REACT_APP_BACKEND_URL;
  return (
    <div>
      <div className="content-container">
        <ToastContainer/>
        <Sidebar/>
        <div className="main-content">
        <Routes>
        <Route path='/' element={<ListItems url = {url}/>} /> 
          <Route path='add' element={<AddItems url={url}/>} />
          <Route path='list' element={<ListItems url = {url}/>} />
          <Route path='orders' element={<Orders url = {url}/>} />
        </Routes>
        </div>
       
      </div>
    </div>
  )
}

export default App



