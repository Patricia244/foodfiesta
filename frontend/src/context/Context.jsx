import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const url = process.env.REACT_APP_BACKEND_URL;
  const addToCart = async (itemId) => {
    if (cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: 1 });
    }
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] === 1) {
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
    }
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const clearCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((food) => food._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${url}/api/food/listItems`, headers);
    setFoodList(response.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(`${url}/api/cart/getItems`, {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;