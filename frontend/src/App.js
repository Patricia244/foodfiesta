import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import CartItems from './pages/Cart/CartItems';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/login/Login';
import Verify from './pages/verify/Verify'
import { useState } from 'react';
import UserOrders from './pages/userOrders/UserOrders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ExploreMenu from './components/exploreMenu/ExploreMenu';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <ToastContainer/>
        <Navbar className="navbar" setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/cart" element={<CartItems />} /> 
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} /> 
          <Route path="/MyOrders" element={<UserOrders />} />
          <Route path="/menu" element={<ExploreMenu />} />
        </Routes>
        <footer className="footer">
        <p>&copy; 2025 Food Fiesta. All rights reserved.</p>
        <nav>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </footer>
      </div>
    </>
  );
}

export default App;