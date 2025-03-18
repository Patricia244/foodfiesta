import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/Context';
import axios from 'axios';

function PlaceOrder() {
  const { getTotalCartAmount, foodList, cartItems, url, token } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.forEach((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 100,
    };

    try {
      const response = await axios.post(`${url}/api/order/placeOrder`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="place-order-form" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p>Delivery Information</p>
        <div className="place-order-left-input">
          <div className="multiple-fields">
            <input
              required
              type="text"
              id="name"
              placeholder="Enter your First name"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              id="surname"
              placeholder="Enter your Last name"
            />
          </div>
          <div className="multiple-fields">
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            id="street"
            placeholder="Street"
          />
          <div className="multiple-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              id="city"
              placeholder="Enter your city"
            />
            <input
              required
              name="province"
              onChange={onChangeHandler}
              value={data.province}
              type="text"
              id="province"
              placeholder="Enter your province"
            />
          </div>
          <input
            required
            name="postalCode"
            onChange={onChangeHandler}
            value={data.postalCode}
            type="text"
            id="postalCode"
            placeholder="Postal code"
          />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>R{getTotalCartAmount() !== 0 ? 100 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>R {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</p>
            </div>
          </div>
          <button type="submit" className="checkout-btn">
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;