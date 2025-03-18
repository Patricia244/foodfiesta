import React from 'react';
import './CartItems.css';
import { useContext } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { StoreContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

function CartItems() {
  const { cartItems, foodList, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      {getTotalCartAmount() === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
        </div>
      ) : (
        <>
          <div className="cartItems">
            <div className="cartItems-title">
              <h2>My Cart</h2>
            </div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {foodList.map((item,index) => {
                  if (!cartItems[item._id]) {
                    return null;
                  } else {
                    const total = cartItems[item._id] * item.price;
                    return (
                      <tr key={index}>
                        <td>
                          <img src={`${url}/uploads/${item.image}`} alt={item.name} className="cart-item-image" />
                        </td>
                        <td>{item.name}</td>
                        <td>R{item.price}</td>
                        <td>{cartItems[item._id]}</td>
                        <td>R{total}</td>
                        <td>
                          <div className="button-container">
                            <DeleteOutlinedIcon onClick={() => removeFromCart(item._id)} className='cart-btn' />
                            <AddCircleOutlineOutlinedIcon onClick={() => addToCart(item._id)} className='cart-btn' />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div className="cart-bottom">
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
              <button className="checkout-btn" onClick={() => navigate('/order')}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItems;