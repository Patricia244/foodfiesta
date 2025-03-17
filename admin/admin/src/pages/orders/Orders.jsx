import React, { useEffect, useState } from 'react'
import './Orders'
import axios from 'axios'
import { toast } from 'react-toastify'
import ordersImage from '../../assets/orders.png'

function Orders({url}) {
  const [orders,setOrders] = useState([])

  const getOrders = async()=>{
    try {
      const response = await axios.get(`${url}/listOrders`)
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error('error')
      }
    } catch (error) {
      toast.error('error:',error.message)
    }
  }
  useEffect(()=>{
    getOrders()
  })
  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order,index)=>{
          <div className="order-item" key={index}>
            <img src={ordersImage} alt='orders'/>
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if(index === orders.items.length -1){
                    return `${item.name} x ${item.quantity}`
                  }else{
                     return `${item.name} x ${item.quantity},`
                  }
                })}
              </p>
              <p>{order.address.firname+ " ".order.address.lastname}</p>
            </div>
          </div>
        })}
      </div>

    </div>
  )
}

export default Orders
