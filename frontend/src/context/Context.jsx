import { createContext, useState,useEffect } from "react";
import { foodList } from "../assets/images/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {
const [cartItems, setCartItems] = useState({});

const addToCart = (id) => {
if(cartItems[id]){  
setCartItems({...cartItems, [id]: cartItems[id] + 1})
}
else{
setCartItems({...cartItems, [id]: 1})
}
}
const removeFromCart = (id) => {
if(cartItems[id] === 1){
const newCartItems = {...cartItems}
delete newCartItems[id]
setCartItems(newCartItems)
}
else{
setCartItems({...cartItems, [id]: cartItems[id] - 1})
}
}
const clearCart = () => {   
setCartItems({})

}
useEffect(() => {
const cartItems = localStorage.getItem('cartItems')
if(cartItems){
setCartItems(JSON.parse(cartItems))
}   
}, [])

const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCartItems}

return (
<StoreContext.Provider value={contextValue}>
{children}
</StoreContext.Provider>
)

}
export default StoreContextProvider;