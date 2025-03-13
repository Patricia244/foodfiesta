import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/Context'

function PlaceOrder() {
  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className="place-order-form">
      <div className="place-order-left">
        <p> Delivery Information</p>
        <div className="place-order-left-input">
          <div className="multiple-fields">
          <input type="text" id="name" placeholder="Enter your First name" />
          <input type="text" id="surname" placeholder="Enter your Last name" />
          </div>
          <div className="multiple-fields">
          <input type="email" id="email" placeholder="Enter your email" />
          <input type="text" id="country" placeholder="Enter your phone number" />
          </div>
          <input type="text" id="address" placeholder="Enter your address" />
          <div className="multiple-fields">
          <input type="text" id="city" placeholder="Enter your city" />
          <input type="text" id="province" placeholder="Enter your province" />
          </div>
            
          </div>
      </div>
      <div className="place-oder-right">
      <div className="cart-total">
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>R{getTotalCartAmount() !==0? 100:0}</p>
            </div>
            <h/>
            <div className="cart-total-details">
              <p>Total</p>
              <p>R {getTotalCartAmount() === 0? 0 :getTotalCartAmount() + 100}</p>
            </div>
          </div>
          <button className="checkout-btn">Proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
