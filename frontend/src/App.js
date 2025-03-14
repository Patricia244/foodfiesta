import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import CartItems from './pages/Cart/CartItems';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/login/Login';
import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <Navbar className="navbar" setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/cart" element={<CartItems />} /> {/* Cart page */}
          <Route path="/order" element={<PlaceOrder />} /> {/* Place Order page */}
        </Routes>
        <footer className="footer">
          <p>&copy; 2023 FoodFiesta. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;