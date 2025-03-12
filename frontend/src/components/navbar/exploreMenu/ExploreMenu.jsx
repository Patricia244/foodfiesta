import React from 'react'
import './ExploreMenu.css'
import { menuList } from '../../../assets/images/assets'
function ExploreMenu({category,setCategory}) {
  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1 className='exploreMenu-heading'>Explore our menu</h1>
      <div className='exploreMenu-list'>
        {menuList.map((item, index) => (
          <div key={index} className='exploreMenu-item' onClick={()=>setCategory(prev =>prev === item.menuName?"all":item.menuName)}>
            <img src={item.image} alt={item.alt} className={category === item.menuName?"active":""}/>
            <p className='exploreMenu-item-heading'>{item.menuName}</p>
            <p className='exploreMenu-item-desc'>{item.desc}</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default ExploreMenu
