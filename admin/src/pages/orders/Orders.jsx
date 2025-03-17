import React, { useEffect, useState } from 'react';
import './Orders.css'; // Import the CSS file
import axios from 'axios';
import { toast } from 'react-toastify';
import ordersImage from '../../assets/orders.png';

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/order/listOrders`);
      if (response.data.success) {
        setOrders(response.data.order);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const updateOrderStatus = async(event,orderId)=>{
    try {
      const response = await axios.post('http://localhost:4000/api/order/status',{orderId,status:event.target.value})
      if(response.data.success){
        await getOrders()
      }
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getOrders();
  }, [url]);

  return (
    <div className="user-orders">
      <h2>Orders</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={ordersImage} alt="orders" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <div className="customer-details">
                <p className='customer-name'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{`${order.address.city} ${order.address.province} ${order.address.postalCode}`}</p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <p>Items: {order.items.length}</p>
            <p>R {order.amount}</p>
            <select value={order.status} onChange={(event)=>updateOrderStatus (event,order._id)}>
              <option value="Food processing">Food processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;