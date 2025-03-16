import { createContext, useState,useEffect } from "react";
import { foodList } from "../assets/images/assets";
import axios from "axios";
export const StoreContext = createContext(null);


const StoreContextProvider = ({children}) => {
const [cartItems, setCartItems] = useState({});
const [ foodList,setFoodList] = useState([])
const url ='http://localhost:4000'
const [token,setToken] = useState("")

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
const getTotalCartAmount = ()=>{
    let totalAmount = 0
    for(const item in cartItems){
        console.log(item)
        if(cartItems[item] >0){
            const itemInfo = foodList.find(food => food._id === item);
            console.log(itemInfo)
            totalAmount += itemInfo.price * cartItems[item];
        }
        
    }
    return totalAmount

}

const fetchFoodList = async()=>{
    const response = await axios.get(`${url}/api/food/listItems`)
    setFoodList(response.data)

}

useEffect(()=>{
    async function loadData(){
        await fetchFoodList()
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    }
    loadData()
},[])

const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCartItems, getTotalCartAmount, url,token, setToken}

return (
<StoreContext.Provider value={contextValue}>
{children}
</StoreContext.Provider>
)

}
export default StoreContextProvider;