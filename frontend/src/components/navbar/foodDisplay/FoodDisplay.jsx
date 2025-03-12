import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../../context/Context'
import FoodItem from './foodItem/FoodItem'
function FoodDisplay({category}) {
    const {foodList} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top Food</h2>
      <div className="food-display-list">
        {foodList.map((item,index)=>{
          if(category === 'all' || item.category === category)
          {
            return(<FoodItem
              key={index} image={item.image} id={item.id} 
              name ={item.name} 
              description={item.description}
              price ={item.price} 
              category={item.category}/>)
          }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
