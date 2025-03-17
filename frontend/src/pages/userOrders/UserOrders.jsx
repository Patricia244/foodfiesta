import React, { useState, useContext, useEffect } from 'react';
import './UserOrders.css';
import { StoreContext } from '../../context/Context';
import axios from 'axios';
import orders from '../../assets/images/orders.png'
import { CircleLoader } from 'react-spinners'; 

function UserOrders() {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const getUserOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers:{token },
        }
      )
      setData(response.data.order);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserOrders();
    } 
  }, [token]);
 
  return (
    <div className="user-orders">
      
      <h2>My Orders</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((order) => (
            <li key={order._id}>
              <img src={orders} alt="orders" />
              <p>
                {order.items
                  .map((item) => `${item.name} x  ${item.quantity}`)
                  .join(', ')}
              </p>
              <p> R {order.amount}</p>
              <p>Items:{order.items.length}</p>
              <p> {order.status}</p>
              <button className='order-button'>Track order</button>
            </li>
          ))}
        </ul>
      ) : (
       <div className="loader">
        <CircleLoader />
       </div>
      )}
    </div>
  );
}

export default UserOrders;