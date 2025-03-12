import React, {useContext} from 'react';
import './FoodItem.css';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { StoreContext } from '../../../../context/Context';

function FoodItem({ image, name, price, description,id }) {
const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)
  return (
    <div className='food-item'>
      <div className="food-item-card">
        <div className="food-item-image-container">
          <img className='food-item-image' src={image} alt={name} />
          <div className="food-item-quantity-container">
            {cartItems[id]> 0 ? (
              <div className='food-item-quantity'>
                <RemoveCircleOutlineOutlinedIcon
                  className="food-item-remove-btn"
                  onClick={() => removeFromCart(id)}
                />
                <p>{cartItems[id]}</p>
                <AddCircleOutlineOutlinedIcon
                  className='food-item-add-btn'
                  onClick={() => addToCart(id)}
                />
              </div>
            ) : (
              <AddCircleOutlineOutlinedIcon
                onClick={() => addToCart(id)}
                className='food-item-add-btn'
              />
            )}
          </div>
        </div>
        <div className="food-item-info">
          <p>{name}</p>
          <p className='food-item-desc'>{description}</p>
          <p className='food-item-price'>R{price}</p>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;